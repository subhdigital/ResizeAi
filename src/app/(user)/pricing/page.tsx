'use client';

import { useState } from 'react';
import Script from 'next/script';
import Navbar from '@/components/user/Navbar';


const PLANS = [
    {
        id: 'PRO',
        title: 'Pro',
        price: '₹499',
        features: ['1000 Credits/mo', 'Priority Support', 'No Ads', 'Higher Resolution'],
        recommended: true
    },
    {
        id: 'ENTERPRISE',
        title: 'Enterprise',
        price: '₹1999',
        features: ['10000 Credits/mo', 'API Access', 'Dedicated Account Manager', 'Custom Branding'],
        recommended: false
    }
];

export default function PricingPage() {
    const [loading, setLoading] = useState<string | null>(null);

    const handleSubscribe = async (planId: string) => {
        setLoading(planId);
        try {
            // 1. Create Subscription
            const res = await fetch('/api/subscription/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ planId })
            });

            const data = await res.json();
            if (!res.ok) {
                if (res.status === 401) {
                    // Redirect to login
                    window.location.href = '/login?redirect=/pricing';
                    return;
                }
                throw new Error(data.error || 'Failed to initiate subscription');
            }

            // 2. Open Razorpay Checkout
            // 2. Open Razorpay Checkout
            const options = {
                key: data.keyId,
                subscription_id: data.subscriptionId,
                name: "ImageTools Premium",
                description: `Subscribe to ${data.planName}`,
                handler: async function (response: any) {
                    try {
                        const verifyRes = await fetch('/api/subscription/verify', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_subscription_id: response.razorpay_subscription_id,
                                razorpay_signature: response.razorpay_signature,
                                planId: planId // Send this so backend knows how many credits to give
                            })
                        });

                        const verifyData = await verifyRes.json();

                        if (verifyRes.ok) {
                            alert('Subscription Verified! Credits added: ' + (verifyData.credits || 'Unknown'));
                            window.location.href = '/dashboard';
                        } else {
                            alert('Payment successful but verification failed: ' + verifyData.error);
                            // Still redirect to dashboard so they can verify if it worked or contact support
                            window.location.href = '/dashboard';
                        }
                    } catch (err: any) {
                        console.error(err);
                        alert('Error verifying payment: ' + err.message);
                    }
                },
                theme: {
                    color: "#00d4ff"
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (error: any) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black text-slate-900 mb-6">Simple, Transparent Pricing</h1>
                    <p className="text-xl text-slate-500">Choose the plan that's right for you.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {PLANS.map((plan) => (
                        <div key={plan.id} className={`bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border-2 ${plan.recommended ? 'border-blue-500 relative overflow-hidden' : 'border-slate-100'}`}>
                            {plan.recommended && (
                                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest">
                                    Recommended
                                </div>
                            )}
                            <h3 className="text-2xl font-black text-slate-900 mb-2">{plan.title}</h3>
                            <div className="flex items-baseline mb-8">
                                <span className="text-5xl font-black text-slate-900">{plan.price}</span>
                                <span className="text-slate-500 font-medium ml-2">/month</span>
                            </div>

                            <ul className="space-y-4 mb-10">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-slate-600 font-medium">
                                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleSubscribe(plan.id)}
                                disabled={!!loading}
                                className={`w-full py-4 rounded-xl font-black text-lg transition-all ${plan.recommended
                                    ? 'bg-[#00d4ff] text-white hover:shadow-lg hover:-translate-y-1'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                            >
                                {loading === plan.id ? 'Processing...' : `Subscribe to ${plan.title}`}
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
