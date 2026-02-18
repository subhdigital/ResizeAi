'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface CreditExhaustedModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreditExhaustedModal({ isOpen, onClose }: CreditExhaustedModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[2000] flex items-center justify-center px-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl p-8 md:p-10 text-center overflow-hidden"
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-orange-500" />

                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">⚠️</span>
                    </div>

                    <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                        Out of Credits!
                    </h2>

                    <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                        You've used all your free guest credits. <br />
                        <span className="font-bold text-slate-700">Log in</span> or <span className="font-bold text-slate-700">Sign up</span> to get more credits and unlock all features!
                    </p>

                    <div className="space-y-4">
                        <Link
                            href="/login"
                            className="block w-full py-4 bg-[#00d4ff] text-white font-black text-lg rounded-2xl shadow-[0_10px_20px_rgba(0,212,255,0.3)] hover:shadow-[0_15px_30px_rgba(0,212,255,0.4)] transition-all hover:-translate-y-1 active:translate-y-0"
                        >
                            Log In to Continue
                        </Link>

                        <Link
                            href="/register"
                            className="block w-full py-4 bg-slate-100 text-slate-700 font-bold text-lg rounded-2xl hover:bg-slate-200 transition-all"
                        >
                            Create Free Account
                        </Link>
                    </div>

                    <button
                        onClick={onClose}
                        className="mt-6 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        Maybe later
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
