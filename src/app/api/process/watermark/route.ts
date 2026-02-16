import { NextRequest, NextResponse } from 'next/server';
import { processImage, validateImageFile } from '@/lib/imageProcessor';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('image') as File;
        const watermarkFile = formData.get('watermark') as File;
        const gravity = formData.get('gravity') as string || 'center';

        if (!file || !watermarkFile) {
            return NextResponse.json({ error: 'Missing images' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const watermarkBuffer = Buffer.from(await watermarkFile.arrayBuffer());

        if (!(await validateImageFile(buffer)) || !(await validateImageFile(watermarkBuffer))) {
            return NextResponse.json({ error: 'Invalid file format' }, { status: 400 });
        }

        const result = await processImage(buffer, {
            watermark: {
                image: watermarkBuffer,
                gravity
            }
        });

        return new NextResponse(result.buffer as any, {
            headers: {
                'Content-Type': `image/${result.format}`,
                'Content-Disposition': `attachment; filename="watermarked_${file.name}"`,
            },
        });
    } catch (error) {
        console.error('Watermark Error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
