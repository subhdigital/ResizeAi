import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { razorpay } from '@/lib/razorpay';
import connectDB from '@/lib/db';
import User from '@/models/User';
import PaymentLog from '@/models/PaymentLog';

// Webhook Secret from Razorpay Dashboard
const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || 'your_webhook_secret';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const rawBody = await req.text();
        const signature = req.headers.get('x-razorpay-signature');

        // 1. Verify Signature
        if (!verifySignature(rawBody, signature, WEBHOOK_SECRET)) {
            return NextResponse.json({ error: 'Invalid Signature' }, { status: 400 });
        }

        const event = JSON.parse(rawBody);
        const { payload, event: eventType } = event;

        // 2. Handle Events
        // Webhooks disabled for initial flow per user request. 
        // Note: Re-enable 'subscription.charged' for recurring renewal credits in production.
        /*
        if (eventType === 'subscription.charged') {
            await handleSubscriptionCharged(payload);
        } else if (eventType === 'subscription.activated') {
            await handleSubscriptionActivated(payload);
        } else if (eventType === 'subscription.cancelled') {
            await handleSubscriptionCancelled(payload);
        }
        */
        // Add other events if needed

        return NextResponse.json({ status: 'ok' });

    } catch (error) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
    }
}

function verifySignature(body: string, signature: string | null, secret: string) {
    if (!signature) return false;
    const generatedLogo = crypto
        .createHmac('sha256', secret)
        .update(body)
        .digest('hex');
    return generatedLogo === signature;
}

async function handleSubscriptionActivated(payload: any) {
    const subscription = payload.subscription.entity;
    // Update User.subscription.status = 'active'
    // Find user by subscription_id (which we stored on create if possible) OR
    // User might not be linked yet if we only relied on webhook.
    // Better: use 'notes.userId' we sent during creation!

    const userId = subscription.notes?.userId;
    if (userId) {
        await User.findByIdAndUpdate(userId, {
            'subscription.id': subscription.id,
            'subscription.status': 'active',
            'subscription.currentPeriodStart': new Date(subscription.current_start * 1000),
            'subscription.currentPeriodEnd': new Date(subscription.current_end * 1000),
            'subscription.nextBillingDate': new Date(subscription.charge_at * 1000),
            'plan': 'pro' // Logic to map plan_id to 'pro'/'enterprise'
        });
    }
}

async function handleSubscriptionCharged(payload: any) {
    const payment = payload.payment.entity;
    const subscription = payload.subscription.entity;
    const userId = subscription.notes?.userId;

    if (userId) {
        // Renew or Activate
        await User.findByIdAndUpdate(userId, {
            'subscription.status': 'active',
            'subscription.currentPeriodEnd': new Date(subscription.current_end * 1000),
            'subscription.nextBillingDate': new Date(subscription.charge_at * 1000),
            $inc: { creditsRemaining: 1000 } // Refill credits on successful charge
        });

        // Log Payment
        await PaymentLog.create({
            userId,
            subscriptionId: subscription.id,
            paymentId: payment.id,
            amount: payment.amount / 100, // Amount is in paise
            currency: payment.currency,
            status: 'success',
            eventType: 'subscription.charged',
            metadata: payment
        });
    }
}

async function handleSubscriptionCancelled(payload: any) {
    const subscription = payload.subscription.entity;
    const userId = subscription.notes?.userId;

    if (userId) {
        await User.findByIdAndUpdate(userId, {
            'subscription.status': 'cancelled',
            'plan': 'free' // Revert to free immediately or at period end? usually immediately or handle grace period.
        });
    }
}
