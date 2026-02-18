import { NextRequest, NextResponse } from 'next/server';
import { processImage, validateImageFile } from '@/lib/imageProcessor';
import { checkAndDeductCredits } from '@/lib/credits';
import { getFingerprint } from '@/lib/fingerprint'; // Note: server-side, this won't work like client. checkAndDeductCredits handles reading header.

export async function POST(req: NextRequest) {
    // Check credits
    const creditCheck = await checkAndDeductCredits(req, 'convert_image');
    if (!creditCheck.success) {
        return NextResponse.json(
            { error: creditCheck.error || 'Insufficient credits. Please upgrade or wait for refill.' },
            { status: 402 }
        );
    }

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

