export const metadata = {
    title: 'Terms & Conditions - Resizely AI',
    description: 'Terms and conditions for using Resizely AI services provided by NewRatan Technologies Pvt Ltd.',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans py-32 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100">
                    <h1 className="text-4xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-6">Terms & Conditions</h1>
                    <p className="text-sm text-slate-400 font-bold mb-10 uppercase tracking-widest">Last Updated: February 20, 2026</p>

                    <div className="space-y-10 text-slate-600 font-medium leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-black text-slate-800 mb-4">1. Introduction</h2>
                            <p>
                                Welcome to Resizely AI. These Terms and Conditions govern your use of our website and services provided by <span className="font-bold text-slate-900">NewRatan Technologies Pvt Ltd</span>. By accessing our platform, you agree to comply with these terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-slate-800 mb-4">2. Use of Services</h2>
                            <p>
                                You are granted a limited, non-exclusive, non-transferable license to use our image optimization tools. You agree not to:
                            </p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>Use the service for any illegal purposes.</li>
                                <li>Attempt to reverse engineer our proprietary algorithms.</li>
                                <li>Use automated scripts to overload our servers.</li>
                                <li>Upload content that violates intellectual property rights.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-slate-800 mb-4">3. Accounts and Credits</h2>
                            <p>
                                To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your login credentials. Credits purchased or earned on the platform are non-transferable and expire after the duration specified in your subscription plan.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-slate-800 mb-4">4. Payments and Billing</h2>
                            <p>
                                We use Razorpay for secure payment processing. By selecting a premium plan, you agree to the pricing and billing terms presented at the time of purchase. Subscriptions are billed on a recurring basis unless cancelled.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-slate-800 mb-4">5. Limitation of Liability</h2>
                            <p>
                                NewRatan Technologies Pvt Ltd shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services. We provide tools "as is" without warranty of any kind.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-slate-800 mb-4">6. Contact Information</h2>
                            <p>
                                If you have any questions regarding these terms, please contact us at:
                                <br />
                                <span className="font-bold text-[#00d4ff]">support@newratan.com</span>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
