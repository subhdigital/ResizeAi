'use client';

import { useRouter } from 'next/navigation';

export default function AdminHeader({ title }: { title: string }) {
    const router = useRouter();

    const handleLogout = async () => {
        // We can use the same logout logic as user but redirect to admin login
        try {
            const res = await fetch('/api/auth/logout', { method: 'POST' });
            if (res.ok) {
                router.push('/admin/login');
                router.refresh();
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <header className="admin-header">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-slate-800">{title}</h2>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 pr-6 border-r border-slate-100">
                    <div className="text-right">
                        <p className="text-sm font-bold text-slate-900">System Admin</p>
                        <p className="text-xs text-slate-500">Superuser</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                        A
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="text-sm font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </div>
        </header>
    );
}
