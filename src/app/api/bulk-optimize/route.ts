import { NextRequest, NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest, deductCredits } from '@/lib/middleware';
import { aiOptimize, validateImageFile } from '@/lib/imageProcessor';
import archiver from 'archiver';
import { Readable } from 'stream';

async function handler(req: AuthenticatedRequest) {
    try {
        if (!req.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const files = formData.getAll('images') as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ error: 'No images provided' }, { status: 400 });
        }

        if (files.length > 20) {
            return NextResponse.json(
                { error: 'Maximum 20 images allowed per bulk operation' },
                { status: 400 }
            );
        }

        const processedImages: Array<{ buffer: Buffer; filename: string }> = [];

        // Process all images
        for (const file of files) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const isValid = await validateImageFile(buffer);
            if (!isValid) continue;

            const result = await aiOptimize(buffer);
            const originalName = file.name.split('.')[0];

            processedImages.push({
                buffer: result.buffer,
                filename: `${originalName}_optimized.${result.format}`,
            });
        }

        if (processedImages.length === 0) {
            return NextResponse.json(
                { error: 'No valid images to process' },
                { status: 400 }
            );
        }

        // Deduct credits (1 per image)
        await deductCredits(req.user.userId, processedImages.length);

        // Create ZIP archive
        const archive = archiver('zip', { zlib: { level: 9 } });

        // Add all processed images to archive
        processedImages.forEach(({ buffer, filename }) => {
            archive.append(buffer, { name: filename });
        });

        // Finalize archive
        archive.finalize();

        // Convert stream to buffer
        const chunks: Buffer[] = [];
        for await (const chunk of archive) {
            chunks.push(Buffer.from(chunk));
        }
        const zipBuffer = Buffer.concat(chunks);

        return new NextResponse(new Uint8Array(zipBuffer), {
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': 'attachment; filename="optimized-images.zip"',
                'X-Images-Processed': processedImages.length.toString(),
            },
        });
    } catch (error: any) {
        console.error('Bulk optimize error:', error);
        return NextResponse.json(
            { error: 'Failed to process bulk images' },
            { status: 500 }
        );
    }
}

export const POST = withAuth(handler);
