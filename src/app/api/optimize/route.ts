import { NextRequest, NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest, deductCredits } from '@/lib/middleware';
import { aiOptimize, validateImageFile, getImageMimeType } from '@/lib/imageProcessor';
import connectDB from '@/lib/db';
import CompressionHistory from '@/models/CompressionHistory';

async function handler(req: AuthenticatedRequest) {
    try {
        if (!req.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        // Validate file size
        const maxSize = parseInt(process.env.MAX_FILE_SIZE || '10485760'); // 10MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File size exceeds limit' },
                { status: 400 }
            );
        }

        // Convert to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Validate image
        const isValid = await validateImageFile(buffer);
        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid image file' },
                { status: 400 }
            );
        }

        // Process image
        const result = await aiOptimize(buffer);

        // Save to database
        await connectDB();
        await CompressionHistory.create({
            userId: req.user.userId,
            originalSize: file.size,
            compressedSize: result.size,
            featureUsed: 'ai-optimize',
            originalFormat: file.type,
            outputFormat: result.format,
            creditsUsed: 1,
            compressionRatio: result.compressionRatio,
        });

        // Deduct credits
        await deductCredits(req.user.userId, 1);

        // Return optimized image
        return new NextResponse(new Uint8Array(result.buffer), {
            headers: {
                'Content-Type': getImageMimeType(result.format),
                'Content-Disposition': `attachment; filename="optimized.${result.format}"`,
                'X-Original-Size': file.size.toString(),
                'X-Compressed-Size': result.size.toString(),
                'X-Compression-Ratio': result.compressionRatio.toFixed(2),
                'X-Format': result.format,
            },
        });
    } catch (error: any) {
        console.error('AI Optimize error:', error);
        return NextResponse.json(
            { error: 'Failed to optimize image' },
            { status: 500 }
        );
    }
}

export const POST = withAuth(handler);
