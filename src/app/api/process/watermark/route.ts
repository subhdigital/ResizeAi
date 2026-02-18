import { NextRequest, NextResponse } from 'next/server';
import { processImage, validateImageFile } from '@/lib/imageProcessor';
import { checkAndDeductCredits } from '@/lib/credits';

export async function POST(req: NextRequest) {
    // Check credits
    const creditCheck = await checkAndDeductCredits(req, 'watermark');
    if (!creditCheck.success) {
        return NextResponse.json(
            { error: creditCheck.error || 'Insufficient credits. Please upgrade or wait for refill.' },
            { status: 402 }
        );
    }

    try {
        const formData = await req.formData();
        const file = formData.get('image') as File;
        const gravity = formData.get('gravity') as string || 'center';
        const type = formData.get('type') as string || 'image';

        if (!file) {
            return NextResponse.json({ error: 'Missing image' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        if (!(await validateImageFile(buffer))) {
            return NextResponse.json({ error: 'Invalid file format' }, { status: 400 });
        }

        let watermarkOptions: any = { gravity };

        if (type === 'text') {
            const text = formData.get('text') as string;
            if (!text) {
                return NextResponse.json({ error: 'Missing watermark text' }, { status: 400 });
            }

            watermarkOptions.text = text;
            watermarkOptions.textColor = formData.get('textColor') as string || 'rgba(255, 255, 255, 0.8)';
            watermarkOptions.textSize = parseInt(formData.get('textSize') as string || '5');
            watermarkOptions.opacity = parseFloat(formData.get('opacity') as string || '0.8');

        } else {
            const watermarkFile = formData.get('watermark') as File;
            if (!watermarkFile) {
                return NextResponse.json({ error: 'Missing watermark image' }, { status: 400 });
            }

            const watermarkBuffer = Buffer.from(await watermarkFile.arrayBuffer());
            if (!(await validateImageFile(watermarkBuffer))) {
                return NextResponse.json({ error: 'Invalid watermark file format' }, { status: 400 });
            }

            watermarkOptions.image = watermarkBuffer;
        }

        const result = await processImage(buffer, {
            watermark: watermarkOptions
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
