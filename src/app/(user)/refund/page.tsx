export const metadata = {
    title: 'Refund Policy - Resizely AI',
    description: 'Refund and cancellation policy for Resizely AI services.',
};

export default function RefundPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans py-32 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100">
                    <h1 className="text-4xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-6">Refund & Cancellation</h1>
                    <p className="text-sm text-slate-400 font-bold mb-10 uppercase tracking-widest">Last Updated: February 20, 2026</p>

                    <div className="space-y-10 text-slate-600 font-medium leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-black text-slate-800 mb-4">1. Subscription Cancellation</h2>
                            <p>
                                You can cancel your premium subscription at any time through your dashboard settings. Upon cancellation, you will continue to have access to pro features until the end of your current billing period.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-slate-800 mb-4">2. Refund Eligibility</h2>
                            <p>
                                Due to the nature of digital goods and credits, we generally do not offer refunds once credits have been used. However, you may be eligible for a refund if:
                            </p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>You were charged in error due to a technical glitch.</li>
                                <li>You requested a refund within <span className="text-slate-900 font-bold">24 hours</span> of purchase and have not used any credits from the new plan.</li>
                                <li>The service was unavailable for an extended period of time (more than 48 hours).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-slate-800 mb-4">3. Processing Refunds</h2>
                            <p>
                                Approved refunds will be processed via Razorpay and credited back to your original payment method within <span className="text-slate-900 font-bold">5-7 working days</span>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-slate-800 mb-4">4. Plan Downgrades</h2>
                            <p>
                                If you choose to downgrade your plan, the change will take effect at the start of your next billing cycle. No partial refunds are provided for downgrades made mid-cycle.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-slate-800 mb-4">5. Contact for Refunds</h2>
                            <p>
                                To request a refund or discuss a billing issue, please email us with your Transaction ID at:
                                <br />
                                <span className="font-bold text-[#00d4ff]">billing@newratan.com</span>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
