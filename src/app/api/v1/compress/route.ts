import { NextRequest, NextResponse } from 'next/server';
import { withApiKey } from '@/lib/middleware';
import { optimizeImage, validateImageFile, getImageMimeType } from '@/lib/imageProcessor';
import connectDB from '@/lib/db';
import CompressionHistory from '@/models/CompressionHistory';
import User from '@/models/User';

async function handler(req: NextRequest, user: any) {
    try {
        const formData = await req.formData();
        const file = formData.get('image') as File;
        const quality = parseInt(formData.get('quality') as string) || 80;
        const format = (formData.get('format') as string) || 'auto';

        if (!file) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        // Convert to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Validate image
        const isValid = await validateImageFile(buffer);
        if (!isValid) {
            return NextResponse.json({ error: 'Invalid image file' }, { status: 400 });
        }

        // Process image
        const result = await optimizeImage(buffer, {
            quality,
            autoFormat: format === 'auto',
            format: format !== 'auto' ? format : undefined,
        });

        // Save to database
        await connectDB();
        await CompressionHistory.create({
            userId: user._id,
            originalSize: file.size,
            compressedSize: result.size,
            featureUsed: 'compress',
            originalFormat: file.type,
            outputFormat: result.format,
            creditsUsed: 1,
            compressionRatio: result.compressionRatio,
        });

        // Deduct credits
        await User.findByIdAndUpdate(user._id, {
            $inc: { creditsRemaining: -1 },
        });

        // Return JSON response for API
        return NextResponse.json({
            success: true,
            data: {
                originalSize: file.size,
                compressedSize: result.size,
                format: result.format,
                compressionRatio: result.compressionRatio,
                width: result.width,
                height: result.height,
                image: result.buffer.toString('base64'),
            },
            creditsRemaining: user.creditsRemaining - 1,
        });
    } catch (error: any) {
        console.error('API Compress error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to compress image' },
            { status: 500 }
        );
    }
}

export const POST = withApiKey(handler);
