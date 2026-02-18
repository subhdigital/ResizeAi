import { NextRequest, NextResponse } from 'next/server';
import { razorpay, plans } from '@/lib/razorpay';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';
import User from '@/models/User';
import connectDB from '@/lib/db';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        // 1. Authentication Check
        const token = getTokenFromRequest(req);
        if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const decoded = verifyToken(token);
        if (!decoded || !decoded.userId) return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });

        const user = await User.findById(decoded.userId);
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        // 2. Validate Inputs
        const body = await req.json();
        const { planId } = body; // e.g., 'PRO' or 'ENTERPRISE'

        if (!planId || !plans[planId as keyof typeof plans]) {
            return NextResponse.json({ error: 'Invalid Plan' }, { status: 400 });
        }

        const selectedPlan = plans[planId as keyof typeof plans];
        const razorpayPlanId = selectedPlan.id;

        const razorpayInstance = razorpay();

        // 3. Create or Get Razorpay Customer
        let customerId = user.subscription?.customerId;

        if (!customerId) {
            try {
                const customer = await razorpayInstance.customers.create({
                    name: user.name,
                    contact: '9000090000', // Razorpay often requires a contact number. Using dummy for now as we don't collect phone.
                    email: user.email,
                    fail_existing: 0
                });
                customerId = customer.id;

                // Save customer ID immediately
                user.subscription = user.subscription || {};
                user.subscription.customerId = customerId;
                await user.save();
            } catch (custError: any) {
                console.error('Razorpay Customer Create Error:', custError);
                return NextResponse.json({ error: 'Failed to create payment customer' }, { status: 500 });
            }
        }

        // 4. Create Subscription
        // Using 'any' cast to bypass strict typing issues with the library definition if necessary
        const subscriptionOptions: any = {
            plan_id: razorpayPlanId,
            customer_id: customerId,
            total_count: 120,
            quantity: 1,
            notes: {
                userId: user._id.toString(),
                planName: selectedPlan.name
            }
        };

        const subscription = await razorpayInstance.subscriptions.create(subscriptionOptions);

        return NextResponse.json({
            subscriptionId: subscription.id,
            keyId: process.env.RAZORPAY_KEY_ID,
            planName: selectedPlan.name,
            amount: selectedPlan.price,
            currency: selectedPlan.currency
        });

    } catch (error: any) {
        console.error('Subscription Creation Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
