import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';
import User from '@/models/User';
import connectDB from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const token = getTokenFromRequest(req);
        if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const decoded = verifyToken(token);
        if (!decoded || !decoded.userId) return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });

        const user = await User.findById(decoded.userId).select('subscription plan creditsRemaining');
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        return NextResponse.json({
            plan: user.plan,
            credits: user.creditsRemaining,
            subscription: user.subscription
        });

    } catch (error: any) {
        console.error('Subscription Status Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
