import { NextRequest, NextResponse } from 'next/server';
import { validateImageFile, removeBackground } from '@/lib/imageProcessor';



export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        // Limit size (10MB for external API compatibility)
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Validate image
        const isValid = await validateImageFile(buffer);
        if (!isValid) {
            return NextResponse.json({ error: 'Invalid image file' }, { status: 400 });
        }

        // Process background removal using the helper
        try {
            const resultBuffer = await removeBackground(buffer);

            return new NextResponse(resultBuffer as any, {
                headers: {
                    'Content-Type': 'image/png',
                    'Content-Disposition': `attachment; filename="no_bg_${file.name.split('.')[0]}.png"`,
                },
            });
        } catch (error: any) {
            return NextResponse.json({
                error: 'AI Processing Error',
                message: error.message
            }, { status: 500 });
        }

    } catch (error: any) {
        console.error('Background Removal Error:', error);
        return NextResponse.json({ error: 'Internal server error', message: error.message }, { status: 500 });
    }
}
