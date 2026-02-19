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
                    contact: '8948540760', // Razorpay often requires a contact number. Using dummy for now as we don't collect phone.
                    email: user.email,
                    fail_existing: 0
                });
                customerId = customer.id;

                // Save customer ID immediately
                user.subscription = { status: 'created', customerId: customerId };
                await user.save();
            } catch (custError: any) {
                console.error('Razorpay Customer Create Error:', custError);

                // Handle "Customer already exists" error
                if (custError.error?.code === 'BAD_REQUEST_ERROR' && custError.error?.description?.includes('already exists')) {
                    try {
                        const customers: any = await razorpayInstance.customers.all({ email: user.email, count: 1 } as any);
                        if (customers.items.length > 0) {
                            customerId = customers.items[0].id;

                            // Save found customer ID
                            user.subscription = { status: 'created', customerId: customerId };
                            await user.save();
                        } else {
                            throw new Error('Customer exists error but could not fetch by email');
                        }
                    } catch (fetchError) {
                        return NextResponse.json({
                            error: 'Failed to retrieve existing payment customer',
                            details: custError.error?.description
                        }, { status: 500 });
                    }
                } else {
                    return NextResponse.json({
                        error: 'Failed to create payment customer',
                        details: custError.error?.description || custError.message
                    }, { status: 500 });
                }
            }
        }

        // 4. Create Subscription
        try {
            const subscriptionOptions: any = {
                plan_id: razorpayPlanId,
                customer_id: customerId,
                total_count: 120, // 10 years
                quantity: 1,
                notes: {
                    userId: user._id.toString(),
                    planName: selectedPlan.name
                }
            };

            const subscription: any = await razorpayInstance.subscriptions.create(subscriptionOptions);

            return NextResponse.json({
                subscriptionId: subscription.id,
                keyId: process.env.RAZORPAY_KEY_ID,
                planName: selectedPlan.name,
                amount: selectedPlan.price,
                currency: selectedPlan.currency
            });
        } catch (subError: any) {
            console.error('Razorpay Subscription Error:', subError);

            // If "id provided does not exist", it could be the plan_id OR customer_id
            if (subError.error?.description?.includes('id provided does not exist')) {
                // If we used a customerId, it might be stale/from a different environment
                if (customerId) {
                    console.log('Detected potentially invalid ID. Attempting to create a fresh customer...');

                    try {
                        // Force create a new customer
                        const newCustomer = await razorpayInstance.customers.create({
                            name: user.name,
                            contact: '8948540760',
                            email: `${Date.now()}_${user.email}`, // Slightly different email to avoid "already exists" if that was the block
                            fail_existing: 0
                        });

                        const retryOptions: any = {
                            plan_id: razorpayPlanId,
                            customer_id: newCustomer.id,
                            total_count: 120,
                            quantity: 1,
                            notes: {
                                userId: user._id.toString(),
                                planName: selectedPlan.name,
                                retry: 'true'
                            }
                        };

                        const retrySubscription: any = await razorpayInstance.subscriptions.create(retryOptions);

                        // Update user with new customer ID
                        if (!user.subscription) user.subscription = { status: 'created' };
                        user.subscription.customerId = newCustomer.id;
                        await user.save();

                        return NextResponse.json({
                            subscriptionId: retrySubscription.id,
                            keyId: process.env.RAZORPAY_KEY_ID,
                            planName: selectedPlan.name,
                            amount: selectedPlan.price,
                            currency: selectedPlan.currency
                        });
                    } catch (retryError: any) {
                        console.error('Retry failed:', retryError);
                        // If it still fails with "id provided does not exist", the PLAN ID is definitely wrong
                        if (retryError.error?.description?.includes('id provided does not exist')) {
                            return NextResponse.json({
                                error: `The Razorpay Plan ID "${razorpayPlanId}" does not exist in your account. Please check your Razorpay Dashboard.`,
                                details: retryError.error?.description
                            }, { status: 400 });
                        }
                    }
                }

                return NextResponse.json({
                    error: `Razorpay Plan ID "${razorpayPlanId}" not found. Verify you have created this plan in your Razorpay Dashboard.`,
                    details: subError.error?.description
                }, { status: 400 });
            }

            throw subError; // Rethrow to be caught by outer block
        }

    } catch (error: any) {
        console.error('Subscription Creation Error:', error);
        // More detailed error logging for debugging
        if (error.error && error.error.description) {
            console.error('Razorpay Error Description:', error.error.description);
        }
        return NextResponse.json({
            error: error.message || 'Internal Server Error',
            details: error.error?.description
        }, { status: 500 });
    }
}
