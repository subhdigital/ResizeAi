'use client';

import { motion } from 'framer-motion';

export default function AdminDashboard() {
    const stats = [
        { label: 'Total Users', value: '1,234', trend: '+12%', color: 'blue' },
        { label: 'Total Optimizations', value: '45,678', trend: '+25%', color: 'green' },
        { label: 'Total Revenue', value: '₹5,67,890', trend: '+8%', color: 'purple' },
        { label: 'API Requests', value: '89,012', trend: '+15%', color: 'indigo' },
    ];

    return (
        <div className="admin-dashboard">
            <header className="admin-dashboard__header">
                <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                <p className="text-gray-600">Welcome to the admin control center.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="admin-card"
                    >
                        <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-2xl font-bold">{stat.value}</h3>
                            <span className="text-sm font-medium text-green-600">{stat.trend}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                <div className="admin-card">
                    <h3 className="text-xl font-bold mb-4">Recent Users</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                                    <div>
                                        <p className="font-medium">User {i}</p>
                                        <p className="text-sm text-gray-500">user{i}@example.com</p>
                                    </div>
                                </div>
                                <span className="text-sm px-2 py-1 bg-blue-50 text-blue-600 rounded">Pro</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="admin-card">
                    <h3 className="text-xl font-bold mb-4">System Health</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm">Storage Usage</span>
                                <span className="text-sm font-medium">65%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500" style={{ width: '65%' }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm">API Latency</span>
                                <span className="text-sm font-medium">120ms</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500" style={{ width: '30%' }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm">Success Rate</span>
                                <span className="text-sm font-medium">99.8%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500" style={{ width: '99.8%' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
