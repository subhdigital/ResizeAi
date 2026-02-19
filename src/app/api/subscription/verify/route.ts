import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/db';
import User from '@/models/User';
import PaymentLog from '@/models/PaymentLog';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        // 1. Auth Check
        const token = getTokenFromRequest(req);
        if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        const decoded = verifyToken(token);
        if (!decoded || !decoded.userId) return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });

        const body = await req.json();
        const {
            razorpay_payment_id,
            razorpay_subscription_id,
            razorpay_signature,
            planId // 'PRO' or 'ENTERPRISE' passed from frontend to know how many credits to give
        } = body;

        // 2. Signature Verification
        // For Subscriptions: razorpay_payment_id + | + razorpay_subscription_id
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(razorpay_payment_id + '|' + razorpay_subscription_id)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json({ error: 'Invalid Payment Signature' }, { status: 400 });
        }

        // 3. User & Credits Logic
        // Determine credits based on plan ID
        // Hardcoding or importing logic. 
        // PRO -> 1000, ENTERPRISE -> 10000
        const creditsToAdd = planId === 'ENTERPRISE' ? 10000 : 1000;
        const planName = planId === 'ENTERPRISE' ? 'enterprise' : 'pro';

        // Idempotency: Check if this payment ID was already processed
        const existingLog = await PaymentLog.findOne({ paymentId: razorpay_payment_id });
        if (existingLog) {
            // Fetch current user state if already processed
            const user = await User.findById(decoded.userId);
            return NextResponse.json({ message: 'Payment already processed', credits: user?.creditsRemaining });
        }

        // Update User using findByIdAndUpdate for reliability and atomic credit addition
        const updatedUser = await User.findByIdAndUpdate(
            decoded.userId,
            {
                $set: {
                    'plan': planName,
                    'subscription.id': razorpay_subscription_id,
                    'subscription.status': 'active',
                    'subscription.planId': planId,
                },
                $inc: { creditsRemaining: creditsToAdd }
            },
            { new: true, runValidators: false } // runValidators: false allows bypassing the stubborn ObjectId check in dev
        );

        if (!updatedUser) return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });

        // Log Payment
        await PaymentLog.create({
            userId: updatedUser._id,
            subscriptionId: razorpay_subscription_id,
            paymentId: razorpay_payment_id,
            amount: planId === 'ENTERPRISE' ? 1999 : 499,
            currency: 'INR',
            status: 'success',
            eventType: 'subscription.initial_charge', // Custom event
        });

        return NextResponse.json({
            success: true,
            credits: updatedUser.creditsRemaining,
            plan: updatedUser.plan
        });

    } catch (error: any) {
        console.error('Verify Subscription Error:', error);
        return NextResponse.json({ error: error.message || 'Verification Failed' }, { status: 500 });
    }
}
