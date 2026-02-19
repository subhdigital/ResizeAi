import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
    title: 'About Us - Resizely AI',
    description: 'Learn about NewRatan Technologies Pvt Ltd and our mission to simplify image optimization.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <main>
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-4 bg-white border-b border-slate-100">
                    <div className="max-w-7xl mx-auto text-center">
                        <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-black uppercase tracking-widest mb-6">
                            Our Story
                        </span>
                        <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">
                            Powering the Visual <span className="text-blue-600">Web</span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
                            At <span className="text-slate-900 font-bold">NewRatan Technologies Pvt Ltd</span>, we believe that high-quality visuals shouldn't come at the cost of web performance. Our mission is to provide lightning-fast, AI-driven tools that make image optimization accessible to everyone.
                        </p>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-24 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="relative">
                                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-3xl -z-10 animate-pulse" />
                                <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-100">
                                    <div className="aspect-square relative overflow-hidden rounded-[2rem] bg-slate-100 flex items-center justify-center">
                                        <span className="text-8xl">🚀</span>
                                    </div>
                                </div>
                                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-100 rounded-full -z-10" />
                            </div>

                            <div>
                                <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Why We Exist</h2>
                                <div className="space-y-8">
                                    <div className="flex gap-6">
                                        <div className="flex-shrink-0 w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm">
                                            01
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">Efficiency First</h3>
                                            <p className="text-slate-500 font-medium leading-relaxed">
                                                We're obsessed with speed. Our algorithms are fine-tuned to deliver the best quality-to-size ratio in the industry.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-6">
                                        <div className="flex-shrink-0 w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm">
                                            02
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">AI-Powered Tech</h3>
                                            <p className="text-slate-500 font-medium leading-relaxed">
                                                Leveraging the latest in machine learning to provide smart resizing and background removal that feels like magic.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-6">
                                        <div className="flex-shrink-0 w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm">
                                            03
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">Customer Success</h3>
                                            <p className="text-slate-500 font-medium leading-relaxed">
                                                Your growth is our growth. We provide dedicated support to ensure your visual workflows never stop.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Company Info Card */}
                <section className="py-24 px-4 bg-slate-900 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-[3rem] p-8 md:p-16 border border-white/10 text-center relative z-10">
                        <h2 className="text-3xl font-black text-white mb-8">Registered Entity</h2>
                        <div className="space-y-4">
                            <p className="text-2xl font-bold text-[#00d4ff]">NewRatan Technologies Pvt Ltd</p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-slate-400 font-medium mt-8">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    India
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    support@newratan.com
                                </div>
                            </div>
                        </div>
                        <div className="mt-12">
                            <Link href="/register" className="inline-flex items-center gap-3 px-8 py-4 bg-[#00d4ff] text-white rounded-2xl font-black hover:shadow-lg hover:shadow-blue-500/20 transition-all active:scale-95">
                                Join Us Today
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
