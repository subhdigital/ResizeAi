'use client';

import Navbar from '@/components/user/Navbar';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white font-sans">


            <main className="max-w-4xl mx-auto px-5 py-20 mt-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                        Terms & <span className="text-[#00d4ff]">Conditions</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        Subh Digital Media & Entertainment PVT. LTD.
                    </p>
                    <p className="text-sm text-slate-400 mt-2">
                        Last Updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <div className="prose prose-slate prose-lg max-w-none text-slate-600">
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
                        <p className="mb-4">
                            Welcome to the website and services operated by Subh Digital Media & Entertainment PVT. LTD. (“Company”, “we”, “us”, or “our”).
                        </p>
                        <p className="mb-4">
                            These Terms & Conditions govern your access to and use of our website, tools, and services, including but not limited to image processing tools such as compression, resizing, cropping, format conversion, watermarking, merging, and background removal.
                        </p>
                        <p>
                            By accessing or using our Services, you agree to be bound by these Terms. If you do not agree, please do not use our Services.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Services</h2>
                        <p className="mb-4">
                            Subh Digital Media & Entertainment PVT. LTD. provides online tools that allow users to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Compress images</li>
                            <li>Resize images</li>
                            <li>Crop images</li>
                            <li>Convert image formats</li>
                            <li>Rotate and edit images</li>
                            <li>Merge images</li>
                            <li>Add watermarks</li>
                            <li>Remove image backgrounds</li>
                            <li>Perform batch image processing</li>
                        </ul>
                        <p>
                            The Services may be updated, modified, or discontinued at any time without prior notice.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Eligibility</h2>
                        <p className="mb-4">
                            You must be at least 18 years old or have legal parental/guardian consent to use our Services.
                        </p>
                        <p className="mb-2">By using the Services, you represent and warrant that:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>You have the legal capacity to enter into this agreement.</li>
                            <li>You will comply with all applicable laws and regulations.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">4. User Accounts</h2>
                        <p className="mb-4">Some features may require account registration. You agree to:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Provide accurate and complete information.</li>
                            <li>Maintain the confidentiality of your login credentials.</li>
                            <li>Be responsible for all activities under your account.</li>
                        </ul>
                        <p>
                            We reserve the right to suspend or terminate accounts that violate these Terms.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">5. User Content</h2>
                        <p className="mb-4">
                            “User Content” refers to any files, images, data, or materials uploaded to the platform.
                        </p>
                        <p className="mb-4">
                            You retain ownership of your uploaded content. However, by uploading content, you grant us a limited, temporary license to process the content solely for providing the requested Services. We do not claim ownership of your files.
                        </p>
                        <p className="mb-4">
                            Uploaded and processed files may be automatically deleted after a limited time period for security and storage management purposes.
                        </p>
                        <p className="mb-2">You are solely responsible for ensuring that:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>You have the right to upload the content.</li>
                            <li>The content does not infringe third-party rights.</li>
                            <li>The content does not contain illegal, harmful, or malicious material.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Prohibited Use</h2>
                        <p className="mb-2">You agree not to:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Upload unlawful, copyrighted, or infringing content without authorization.</li>
                            <li>Upload viruses, malware, or harmful code.</li>
                            <li>Attempt to reverse engineer or interfere with the platform.</li>
                            <li>Use automated bots or scraping tools without permission.</li>
                            <li>Abuse the system with excessive or unreasonable usage.</li>
                        </ul>
                        <p>
                            Violation may result in account suspension, termination, or legal action.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Data Privacy</h2>
                        <p className="mb-4">
                            Your personal data is handled in accordance with our Privacy Policy.
                        </p>
                        <p>
                            We implement reasonable technical and organizational security measures to protect user data. However, no system can be guaranteed 100% secure.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Payments & Subscriptions (If Applicable)</h2>
                        <p className="mb-4">Some features may require payment. By purchasing a subscription or service, you agree to:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Pay all applicable fees.</li>
                            <li>Provide valid payment information.</li>
                            <li>Accept our refund and cancellation policies.</li>
                        </ul>
                        <p className="mb-2">
                            Subscription fees are non-refundable unless stated otherwise. We reserve the right to modify pricing at any time.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Intellectual Property</h2>
                        <p className="mb-4">
                            All website content, branding, logos, software, and design elements are the intellectual property of Subh Digital Media & Entertainment PVT. LTD.
                        </p>
                        <p className="mb-2">You may not:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Copy, modify, distribute, or reproduce our materials.</li>
                            <li>Reverse engineer the platform.</li>
                            <li>Use our branding without written permission.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Disclaimer of Warranties</h2>
                        <p className="mb-4">
                            The Services are provided on an “as is” and “as available” basis. We do not guarantee:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Uninterrupted or error-free operation.</li>
                            <li>That results will meet your expectations.</li>
                            <li>That files will never be lost due to technical issues.</li>
                        </ul>
                        <p>
                            Use of the Services is at your own risk.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Limitation of Liability</h2>
                        <p className="mb-4">
                            To the fullest extent permitted by law, Subh Digital Media & Entertainment PVT. LTD. shall not be liable for:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Indirect, incidental, or consequential damages.</li>
                            <li>Data loss.</li>
                            <li>Business interruption.</li>
                            <li>Loss of profits.</li>
                        </ul>
                        <p>
                            Our total liability shall not exceed the amount paid by you for the Services (if applicable).
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Termination</h2>
                        <p className="mb-4">
                            We may suspend or terminate access to the Services at our discretion if:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>You violate these Terms.</li>
                            <li>Your usage poses a security risk.</li>
                            <li>Required by law.</li>
                        </ul>
                        <p>
                            Upon termination, your right to use the Services immediately ceases.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these Terms at any time. Changes become effective upon posting on the website. Continued use of the Services constitutes acceptance of updated Terms.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Governing Law</h2>
                        <p className="mb-4">
                            These Terms shall be governed by and interpreted in accordance with the laws of India.
                        </p>
                        <p>
                            Any disputes shall be subject to the exclusive jurisdiction of the courts located in [Insert City, India].
                        </p>
                    </section>

                    <section className="mb-12 p-8 bg-slate-50 rounded-2xl border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">15. Contact Information</h2>
                        <p className="mb-4">If you have questions about these Terms, please contact:</p>
                        <div className="space-y-2">
                            <p className="font-bold text-slate-900">Subh Digital Media & Entertainment PVT. LTD.</p>
                            <p className="text-slate-600">Email: <span className="text-[#00d4ff]">worksforsubhdigital@gmail.com</span></p>
                            <p className="text-slate-600">Address: B-5a Modern Railway City, Girdharpur Gb Nagar, Chhaprola, Ghaziabad, Chhprola, Uttar Pradesh, India, 201009</p>
                        </div>
                    </section>
                </div>
            </main>


        </div>
    );
}
