
import { Metadata } from "next";
import Link from "next/link";

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
                    <ul className="space-y-2">
                        <li>
                            <Link href="/admin" className="block py-2 px-4 hover:bg-gray-100 rounded">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/users" className="block py-2 px-4 hover:bg-gray-100 rounded">
                                Users & Credits
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/credits" className="block py-2 px-4 hover:bg-gray-100 rounded">
                                Global Config
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="admin-main">
                {children}
            </main>
        </div>
    );
}
