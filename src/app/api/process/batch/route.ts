import { NextRequest, NextResponse } from 'next/server';
import { processImage, validateImageFile } from '@/lib/imageProcessor';
import archiver from 'archiver';
import { PassThrough } from 'stream';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const files = formData.getAll('images') as File[];
        const quality = parseInt(formData.get('quality') as string) || 70;

        if (!files || files.length === 0) {
            return NextResponse.json({ error: 'No files provided' }, { status: 400 });
        }

        const archive = archiver('zip', { zlib: { level: 9 } });
        const stream = new PassThrough();

        // Start archiving in the background
        const promise = new Promise<void>((resolve, reject) => {
            archive.on('end', resolve);
            archive.on('error', reject);
        });

        // Pipe archive to stream
        archive.pipe(stream);

        // Process each file
        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            if (await validateImageFile(buffer)) {
                const result = await processImage(buffer, { quality });
                archive.append(result.buffer, { name: `compressed_${file.name}` });
            }
        }

        archive.finalize();

        return new NextResponse(stream as any, {
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': 'attachment; filename="compressed_images.zip"',
            },
        });
    } catch (error) {
        console.error('Batch Error:', error);
        return NextResponse.json({ error: 'Batch processing failed' }, { status: 500 });
    }
}
