'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface User {
    id: string;
    name: string;
    email: string;
    plan: string;
    creditsRemaining: number;
    apiKey: string;
    subscriptionStatus: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [loggingOut, setLoggingOut] = useState(false);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/auth/me');

            if (!res.ok) {
                // Not authenticated, redirect to login
                router.push('/login');
                return;
            }

            const data = await res.json();
            setUser(data.user);
        } catch (error) {
            console.error('Error fetching user:', error);
            router.push('/login');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoggingOut(true);
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
            router.refresh();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-500 font-bold">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900 group flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#00d4ff] rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">R</div>
                        <span>Resize<span className="text-blue-600">AI</span></span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-100 hover:bg-red-50 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow active:scale-95 disabled:opacity-50"
                    >
                        {loggingOut ? 'Logging out...' : 'Logout'}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight">
                        Welcome back, {user.name}! 👋
                    </h2>
                    <p className="text-lg text-slate-500 font-medium">
                        Here's your account overview
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {/* Plan Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-8 rounded-[2rem] shadow-[0_20px_40px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-lg transition-shadow group"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">
                                Current Plan
                            </h3>
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className={`px-4 py-2 rounded-xl text-sm font-black uppercase tracking-wider ${user.plan === 'pro' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30' :
                                user.plan === 'enterprise' ? 'bg-slate-900 text-white shadow-lg' :
                                    'bg-slate-100 text-slate-600'
                                }`}>
                                {user.plan}
                            </span>
                            {user.plan === 'free' && (
                                <button className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1 group/link">
                                    Upgrade <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                                </button>
                            )}
                        </div>
                    </motion.div>

                    {/* Credits Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-8 rounded-[2rem] shadow-[0_20px_40px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-lg transition-shadow group"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">
                                Credits Remaining
                            </h3>
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-4xl font-black text-slate-900 mb-1">
                            {user.creditsRemaining}
                        </p>
                        <p className="text-sm font-bold text-slate-400">
                            credits available
                        </p>
                    </motion.div>

                    {/* Status Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-8 rounded-[2rem] shadow-[0_20px_40px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-lg transition-shadow group"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">
                                Subscription Status
                            </h3>
                            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-2xl font-black text-slate-900 capitalize flex items-center gap-2">
                            {user.subscriptionStatus === 'active' && <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />}
                            {user.subscriptionStatus}
                        </p>
                    </motion.div>
                </div>

                {/* API Key Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-slate-900 p-8 rounded-[2rem] shadow-xl mb-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-fullblur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 relative z-10">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                API Key
                            </h3>
                            <p className="text-slate-400 font-medium">
                                Use this key to access the API programmatically
                            </p>
                        </div>
                        <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl text-sm font-bold transition-all backdrop-blur-sm">
                            Regenerate Key
                        </button>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 relative z-10">
                        <code className="flex-1 bg-black/30 text-blue-400 font-mono p-4 rounded-xl border border-white/10 break-all">
                            {user.apiKey}
                        </code>
                        <button
                            onClick={() => navigator.clipboard.writeText(user.apiKey)}
                            className="px-6 py-4 bg-[#00d4ff] hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/20 active:translate-y-0.5"
                        >
                            Copy Key
                        </button>
                    </div>
                </motion.div>

                {/* Account Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white p-8 rounded-[2rem] shadow-[0_20px_40px_rgb(0,0,0,0.04)] border border-slate-100"
                >
                    <h3 className="text-xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">
                        Account Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</span>
                            <span className="text-lg font-bold text-slate-700">{user.name}</span>
                        </div>
                        <div>
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</span>
                            <span className="text-lg font-bold text-slate-700">{user.email}</span>
                        </div>
                        <div>
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">User ID</span>
                            <span className="text-sm font-bold font-mono text-slate-500 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 inline-block">{user.id}</span>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
