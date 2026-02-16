import { NextRequest, NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/lib/middleware';
import connectDB from '@/lib/db';
import User from '@/models/User';

async function handler(req: AuthenticatedRequest) {
    try {
        if (!req.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const user = await User.findById(req.user.userId);

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                plan: user.plan,
                creditsRemaining: user.creditsRemaining,
                apiKey: user.apiKey,
                subscriptionStatus: user.subscriptionStatus,
            },
        });
    } catch (error: any) {
        console.error('Get user error:', error);
        return NextResponse.json(
            {
                error: 'Internal server error',
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}

export const GET = withAuth(handler);
