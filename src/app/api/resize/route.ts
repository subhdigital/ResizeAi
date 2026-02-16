import { NextRequest, NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest, deductCredits } from '@/lib/middleware';
import { resizeImage, validateImageFile, getImageMimeType, RESIZE_PRESETS } from '@/lib/imageProcessor';
import connectDB from '@/lib/db';
import CompressionHistory from '@/models/CompressionHistory';
import sharp from 'sharp';

async function handler(req: AuthenticatedRequest) {
    try {
        if (!req.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get('image') as File;
        const preset = formData.get('preset') as string;
        const customWidth = formData.get('width') as string;
        const customHeight = formData.get('height') as string;

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

        let resizedBuffer: Buffer;

        if (preset && RESIZE_PRESETS[preset]) {
            resizedBuffer = await resizeImage(buffer, preset);
        } else if (customWidth && customHeight) {
            resizedBuffer = await resizeImage(buffer, {
                width: parseInt(customWidth),
                height: parseInt(customHeight),
                fit: 'cover',
            });
        } else {
            return NextResponse.json(
                { error: 'Please provide a preset or custom dimensions' },
                { status: 400 }
            );
        }

        const metadata = await sharp(resizedBuffer).metadata();

        // Save to database
        await connectDB();
        await CompressionHistory.create({
            userId: req.user.userId,
            originalSize: file.size,
            compressedSize: resizedBuffer.length,
            featureUsed: 'resize',
            originalFormat: file.type,
            outputFormat: metadata.format || 'jpeg',
            creditsUsed: 1,
            compressionRatio: ((file.size - resizedBuffer.length) / file.size) * 100,
        });

        // Deduct credits
        await deductCredits(req.user.userId, 1);

        return new NextResponse(new Uint8Array(resizedBuffer), {
            headers: {
                'Content-Type': getImageMimeType(metadata.format || 'jpeg'),
                'Content-Disposition': `attachment; filename="resized.${metadata.format}"`,
                'X-Width': metadata.width?.toString() || '',
                'X-Height': metadata.height?.toString() || '',
            },
        });
    } catch (error: any) {
        console.error('Resize error:', error);
        return NextResponse.json(
            { error: 'Failed to resize image' },
            { status: 500 }
        );
    }
}

export const POST = withAuth(handler);
