import { NextRequest, NextResponse } from 'next/server';
import { razorpay } from '@/lib/razorpay';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';
import User from '@/models/User';
import connectDB from '@/lib/db';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const token = getTokenFromRequest(req);
        if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const decoded = verifyToken(token);
        if (!decoded || !decoded.userId) return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });

        const user = await User.findById(decoded.userId);
        if (!user || !user.subscription?.id) {
            return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
        }

        const razorpayInstance = razorpay();

        // Cancel at end of current cycle behavior is generic, but API allows immediate cancel.
        // Usually cancel_at_cycle_end=1 is preferred.
        await razorpayInstance.subscriptions.cancel(user.subscription.id, false); // true for cancel at cycle end

        // Update local DB
        user.subscription.status = 'cancelled';
        user.plan = 'free'; // Consider leaving partial access if cancelled mid-cycle
        await user.save();

        return NextResponse.json({ success: true, message: 'Subscription cancelled' });

    } catch (error: any) {
        console.error('Cancel Subscription Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
