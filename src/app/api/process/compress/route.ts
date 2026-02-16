import { NextRequest, NextResponse } from 'next/server';
import { processImage, validateImageFile } from '@/lib/imageProcessor';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('image') as File;
        const quality = parseInt(formData.get('quality') as string) || 70;

        if (!file) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        // Limit size (10MB)
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Validate image
        const isValid = await validateImageFile(buffer);
        if (!isValid) {
            return NextResponse.json({ error: 'Invalid image file' }, { status: 400 });
        }

        const result = await processImage(buffer, { quality });

        return new NextResponse(result.buffer as any, {
            headers: {
                'Content-Type': `image/${result.format}`,
                'Content-Disposition': `attachment; filename="compressed_${file.name}"`,
            },
        });
    } catch (error: any) {
        console.error('Compression Error:', error);
        return NextResponse.json({ error: 'Internal server error', message: error.message }, { status: 500 });
    }
}
