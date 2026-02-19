'use client';

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import "./admin.css";

const pageTitles: Record<string, string> = {
    '/admin': 'Dashboard Overview',
    '/admin/users': 'User Management',
    '/admin/credits': 'Global Configuration',
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Do not show sidebar/header on login page
    if (pathname === '/admin/login') {
        return <div className="admin-login-layout">{children}</div>;
    }

    const currentTitle = pageTitles[pathname] || 'Admin Panel';

    return (
        <div className="admin-layout">
            <AdminSidebar />

            <main className="admin-main">
                <AdminHeader title={currentTitle} />

                <div className="admin-content">
                    {children}
                </div>
            </main>
        </div>
    );
}
