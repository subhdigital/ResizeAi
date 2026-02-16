import { NextRequest, NextResponse } from 'next/server';
import { processImage, validateImageFile } from '@/lib/imageProcessor';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('image') as File;
        const crop = {
            left: parseInt(formData.get('left') as string),
            top: parseInt(formData.get('top') as string),
            width: parseInt(formData.get('width') as string),
            height: parseInt(formData.get('height') as string),
        };

        if (!file) return NextResponse.json({ error: 'No image' }, { status: 400 });

        const buffer = Buffer.from(await file.arrayBuffer());
        if (!(await validateImageFile(buffer))) return NextResponse.json({ error: 'Invalid file' }, { status: 400 });

        const result = await processImage(buffer, { crop });

        return new NextResponse(result.buffer as any, {
            headers: {
                'Content-Type': `image/${result.format}`,
                'Content-Disposition': `attachment; filename="cropped_${file.name}"`,
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
