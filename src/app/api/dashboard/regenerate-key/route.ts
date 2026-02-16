import { NextRequest, NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/lib/middleware';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { generateApiKey } from '@/lib/auth';

async function handler(req: AuthenticatedRequest) {
    try {
        if (!req.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        // Generate new API key
        const newApiKey = generateApiKey();

        // Update user
        await User.findByIdAndUpdate(req.user.userId, {
            apiKey: newApiKey,
        });

        return NextResponse.json({
            success: true,
            apiKey: newApiKey,
        });
    } catch (error: any) {
        console.error('Regenerate API key error:', error);
        return NextResponse.json(
            { error: 'Failed to regenerate API key' },
            { status: 500 }
        );
    }
}

export const POST = withAuth(handler);
