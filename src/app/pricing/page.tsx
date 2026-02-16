import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pricing - Resize AI',
    description: 'Simple, transparent pricing for professional image tools.',
};

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-white font-sans py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Transparent</span> Pricing
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        Choose the perfect plan for your needs. No hidden fees.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Free Plan */}
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 hover:border-slate-300 transition-all shadow-sm hover:shadow-md flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Free Starter</h3>
                            <p className="text-slate-500">Essential tools for casual users</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-5xl font-black text-slate-900">₹0</span>
                            <span className="text-slate-500 font-medium">/month</span>
                        </div>

                        <ul className="space-y-4 mb-8 flex-grow">
                            {[
                                'Basic Compression',
                                'Standard Resizing',
                                'Convert images one by one',
                                'Standard Quality',
                                'Ad-supported'
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center text-slate-700">
                                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/"
                            className="block w-full py-4 text-center font-bold text-slate-700 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-colors"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 text-white relative overflow-hidden flex flex-col transform md:-translate-y-4 shadow-2xl">
                        {/* Gradient Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                        <div className="absolute top-6 right-6">
                            <span className="bg-gradient-to-r from-amber-200 to-yellow-400 text-slate-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                                Popular
                            </span>
                        </div>

                        <div className="relative z-10 mb-6">
                            <h3 className="text-2xl font-bold mb-2">Resizely Pro</h3>
                            <p className="text-slate-400">Power tools for professionals</p>
                        </div>

                        <div className="relative z-10 mb-8">
                            <div className="flex items-baseline">
                                <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">₹400</span>
                                <span className="text-slate-400 ml-2 font-medium">/month</span>
                            </div>
                            <p className="text-sm text-slate-500 mt-2">Billed monthly</p>
                        </div>

                        <ul className="space-y-4 mb-8 relative z-10 flex-grow">
                            {[
                                'Unlimited Batch Processing',
                                'AI Background Removal',
                                'Advanced Compression (Start/Pro)',
                                'No File Size Limits',
                                'Priority Support',
                                'Ad-free Experience',
                                'Cloud Storage (Coming Soon)'
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center text-slate-200">
                                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                                        <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button className="relative z-10 block w-full py-4 text-center font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg hover:shadow-blue-500/25">
                            Upgrade to Pro
                        </button>
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <p className="text-slate-500 mb-6">Trusted by thousands of creators worldwide</p>
                    {/* Add some dummy logos or social proof later if needed */}
                </div>
            </div>
        </div>
    );
}
