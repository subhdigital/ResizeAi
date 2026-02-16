import { NextRequest, NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/lib/middleware';
import crypto from 'crypto';
import connectDB from '@/lib/db';
import User from '@/models/User';

const PLAN_CREDITS = {
    pro: 1000,
    enterprise: 10000,
};

async function handler(req: AuthenticatedRequest) {
    try {
        if (!req.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            plan,
        } = await req.json();

        // Verify signature
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
            .update(sign.toString())
            .digest('hex');

        if (razorpay_signature !== expectedSign) {
            return NextResponse.json(
                { error: 'Invalid payment signature' },
                { status: 400 }
            );
        }

        // Update user plan and credits
        await connectDB();
        const credits = PLAN_CREDITS[plan as keyof typeof PLAN_CREDITS] || 0;

        await User.findByIdAndUpdate(req.user.userId, {
            plan,
            $inc: { creditsRemaining: credits },
            subscriptionStatus: 'active',
            subscriptionId: razorpay_payment_id,
        });

        return NextResponse.json({
            success: true,
            message: 'Payment verified successfully',
            creditsAdded: credits,
        });
    } catch (error: any) {
        console.error('Verify payment error:', error);
        return NextResponse.json(
            { error: 'Failed to verify payment' },
            { status: 500 }
        );
    }
}

export const POST = withAuth(handler);
