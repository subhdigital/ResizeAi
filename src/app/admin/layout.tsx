
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Dashboard | AI Image Optimizer",
    description: "Manage users, credits, and global settings",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-sidebar__header">
                    <h2 className="gradient-text">Admin Panel</h2>
                </div>
                <nav className="admin-sidebar__nav">
                    <ul>
                        <li>Dashboard</li>
                        <li>Users</li>
                        <li>Optimizations</li>
                        <li>Payments</li>
                        <li>Settings</li>
                    </ul>
                </nav>
            </aside>
            <main className="admin-main">
                {children}
            </main>
        </div>
    );
}
