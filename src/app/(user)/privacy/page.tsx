export const metadata = {
    title: 'Privacy Policy - Resizely AI',
    description: 'Privacy policy for Resizely AI. We value your privacy and security.',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans py-32 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100">
                    <h1 className="text-4xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-6">Privacy Policy</h1>
                    <p className="text-sm text-slate-400 font-bold mb-10 uppercase tracking-widest">Last Updated: February 20, 2026</p>

                    <div className="space-y-10 text-slate-600 font-medium leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-black text-slate-800 mb-4">1. Information We Collect</h2>
                            <p>
                                We collect information that you provide directly to us, such as your name, email address, and payment details when you subscribe. We also collect metadata of the images you upload solely for the purpose of processing them.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-slate-800 mb-4">2. Use of Information</h2>
                            <p>
                                Your data is used to:
                            </p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>Provide and maintain our services.</li>
                                <li>Process your payments and subscriptions.</li>
                                <li>Send you technical notices and support messages.</li>
                                <li>Improve our AI algorithms and user experience.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-slate-800 mb-4">3. Data Security</h2>
                            <p>
                                We implement industry-standard security measures to protect your personal information. Images uploaded for processing are stored temporarily in a secure buffer and are deleted automatically after processed results are downloaded.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-slate-800 mb-4">4. Third-Party Services</h2>
                            <p>
                                We share information with third-party providers like Razorpay (for payments) and MongoDB (for data storage) only to the extent necessary to perform their services. We do not sell your personal data to advertisers.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-slate-800 mb-4">5. Your Choices</h2>
                            <p>
                                You can update your account information or request account deletion at any time by contacting our support team. You may also opt-out of promotional emails.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-slate-800 mb-4">6. Cookies</h2>
                            <p>
                                We use cookies to maintain your session and remember your preferences. You can disable cookies in your browser settings, but some features of the service may not function correctly.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
