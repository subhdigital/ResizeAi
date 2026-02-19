'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-slate-100 py-16 bg-white overflow-hidden relative">
            {/* Decorative background element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="inline-block mb-6">
                            <span className="text-2xl font-black tracking-tight text-[#00d4ff]">
                                Resizely
                            </span>
                        </Link>
                        <p className="text-slate-500 font-medium leading-relaxed text-sm">
                            High-performance AI image tools for modern creators. Part of the NewRatan ecosystem.
                        </p>
                    </div>

                    {/* Links - Company */}
                    <div>
                        <h4 className="text-slate-900 font-black text-sm uppercase tracking-widest mb-6">Company</h4>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-slate-500 hover:text-[#00d4ff] font-bold text-sm transition-colors">About Us</Link></li>
                            <li><Link href="/pricing" className="text-slate-500 hover:text-[#00d4ff] font-bold text-sm transition-colors">Pricing Plans</Link></li>
                            {/* <li><Link href="/contact" className="text-slate-500 hover:text-[#00d4ff] font-bold text-sm transition-colors">Contact Support</Link></li> */}
                        </ul>
                    </div>

                    {/* Links - Legal */}
                    <div>
                        <h4 className="text-slate-900 font-black text-sm uppercase tracking-widest mb-6">Legal</h4>
                        <ul className="space-y-4">
                            <li><Link href="/terms" className="text-slate-500 hover:text-[#00d4ff] font-bold text-sm transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="text-slate-500 hover:text-[#00d4ff] font-bold text-sm transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/refund" className="text-slate-500 hover:text-[#00d4ff] font-bold text-sm transition-colors">Refund Policy</Link></li>
                        </ul>
                    </div>

                    {/* Community */}
                    {/* <div>
                        <h4 className="text-slate-900 font-black text-sm uppercase tracking-widest mb-6">Resources</h4>
                        <ul className="space-y-4">
                            <li><Link href="/blog" className="text-slate-500 hover:text-[#00d4ff] font-bold text-sm transition-colors">Blog</Link></li>
                            <li><Link href="/docs" className="text-slate-500 hover:text-[#00d4ff] font-bold text-sm transition-colors">API Docs</Link></li>
                            <li><Link href="/affiliate" className="text-slate-500 hover:text-[#00d4ff] font-bold text-sm transition-colors">Affiliate Program</Link></li>
                        </ul>
                    </div> */}
                </div>

                <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                        &copy; {new Date().getFullYear()} Resizely.<a href='https://subhdigital.in' target='_blank' rel='noopener noreferrer'><span className="text-slate-600">Subh Digital Media & Technologies PVT LTD</span></a>.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-slate-400 hover:text-blue-500 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                        </a>
                        <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}