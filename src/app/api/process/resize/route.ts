import { NextRequest, NextResponse } from 'next/server';
import { processImage, validateImageFile } from '@/lib/imageProcessor';
import { checkAndDeductCredits } from '@/lib/credits';

export async function POST(req: NextRequest) {
    try {
        // Enforce credit usage
        const creditCheck = await checkAndDeductCredits(req, 'resize_image');
        if (!creditCheck.success) {
            return NextResponse.json(
                { error: creditCheck.error || 'Insufficient credits. Please upgrade or wait for refill.' },
                { status: 402 } // Payment Required
            );
        }

        const formData = await req.formData();
        const file = formData.get('image') as File;
        const width = formData.get('width') ? parseInt(formData.get('width') as string) : undefined;
        const height = formData.get('height') ? parseInt(formData.get('height') as string) : undefined;

        if (!file) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const isValid = await validateImageFile(buffer);
        if (!isValid) {
            return NextResponse.json({ error: 'Invalid image file' }, { status: 400 });
        }

        const result = await processImage(buffer, { width, height });

        return new NextResponse(result.buffer as any, {
            headers: {
                'Content-Type': `image/${result.format}`,
                'Content-Disposition': `attachment; filename="resized_${file.name}"`,
            },
        });
    } catch (error: any) {
        console.error('Resize Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
