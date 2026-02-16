import { NextRequest, NextResponse } from 'next/server';
import { processImage, validateImageFile } from '@/lib/imageProcessor';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('image') as File;
        const rotate = parseInt(formData.get('rotate') as string) || 0;

        if (!file) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        if (!(await validateImageFile(buffer))) {
            return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
        }

        const result = await processImage(buffer, { rotate });

        return new NextResponse(result.buffer as any, {
            headers: {
                'Content-Type': `image/${result.format}`,
                'Content-Disposition': `attachment; filename="rotated_${file.name}"`,
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
