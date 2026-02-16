import { NextRequest, NextResponse } from 'next/server';
import { processImage, validateImageFile } from '@/lib/imageProcessor';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('image') as File;
        const format = formData.get('format') as any;

        if (!file || !format) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        if (!(await validateImageFile(buffer))) {
            return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
        }

        const result = await processImage(buffer, { format, quality: 90 });

        return new NextResponse(result.buffer as any, {
            headers: {
                'Content-Type': `image/${result.format}`,
                'Content-Disposition': `attachment; filename="converted.${result.format === 'jpeg' ? 'jpg' : result.format}"`,
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
