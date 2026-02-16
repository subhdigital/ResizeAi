import { NextRequest, NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/lib/middleware';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || '',
    key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

const PLANS = {
    pro: {
        amount: 99900, // ₹999 in paise
        credits: 1000,
        name: 'Pro Plan',
    },
    enterprise: {
        amount: 499900, // ₹4999 in paise
        credits: 10000,
        name: 'Enterprise Plan',
    },
};

async function handler(req: AuthenticatedRequest) {
    try {
        if (!req.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { plan } = await req.json();

        if (!plan || !PLANS[plan as keyof typeof PLANS]) {
            return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
        }

        const planDetails = PLANS[plan as keyof typeof PLANS];

        // Create Razorpay order
        const order = await razorpay.orders.create({
            amount: planDetails.amount,
            currency: 'INR',
            receipt: `order_${Date.now()}`,
            notes: {
                userId: req.user.userId,
                plan,
            },
        });

        return NextResponse.json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error: any) {
        console.error('Create order error:', error);
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
        );
    }
}

export const POST = withAuth(handler);
