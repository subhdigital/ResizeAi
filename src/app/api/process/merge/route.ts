import { NextRequest, NextResponse } from 'next/server';
import { mergeImages, validateImageFile } from '@/lib/imageProcessor';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const files = formData.getAll('images') as File[];
        const layout = (formData.get('layout') as 'horizontal' | 'vertical') || 'horizontal';

        if (!files || files.length < 2) {
            return NextResponse.json({ error: 'At least 2 images required' }, { status: 400 });
        }

        const buffers = await Promise.all(files.map(async (f) => Buffer.from(await f.arrayBuffer())));

        // Validate all
        for (const buffer of buffers) {
            if (!(await validateImageFile(buffer))) {
                return NextResponse.json({ error: 'Invalid file detected' }, { status: 400 });
            }
        }

        const mergedBuffer = await mergeImages(buffers, layout);

        return new NextResponse(mergedBuffer as any, {
            headers: {
                'Content-Type': 'image/png',
                'Content-Disposition': 'attachment; filename="merged_image.png"',
            },
        });
    } catch (error) {
        console.error('Merge Error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
