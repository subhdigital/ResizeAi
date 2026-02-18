'use client';

import { useState, useEffect } from 'react';

export default function GlobalCreditConfig() {
    const [config, setConfig] = useState({
        anonymousDefaultCredits: 5,
        registeredDefaultCredits: 10,
        subscriptionCredits: 100,
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await fetch('/api/admin/system/credits');
                if (res.ok) {
                    const data = await res.json();
                    if (data && !data.error) {
                        setConfig({
                            anonymousDefaultCredits: data.anonymousDefaultCredits,
                            registeredDefaultCredits: data.registeredDefaultCredits,
                            subscriptionCredits: data.subscriptionCredits,
                        });
                    }
                }
            } catch (err) {
                console.error('Failed to fetch config', err);
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfig({ ...config, [e.target.name]: parseInt(e.target.value) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            const res = await fetch('/api/admin/system/credits', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config),
            });
            if (res.ok) {
                setMessage('Configuration updated successfully!');
            } else {
                setMessage('Failed to update configuration.');
            }
        } catch (err) {
            setMessage('Error saving configuration.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Global Credit Configuration</h1>

            <div className="bg-white rounded-lg shadow-md p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Anonymous Users (Default Credits)
                        </label>
                        <input
                            type="number"
                            name="anonymousDefaultCredits"
                            value={config.anonymousDefaultCredits}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            min="0"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Credits given to new visitors tracked by device fingerprint/cookie.
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Registered Users (Default Credits)
                        </label>
                        <input
                            type="number"
                            name="registeredDefaultCredits"
                            value={config.registeredDefaultCredits}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            min="0"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Credits given upon account creation.
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subscription Users (Monthly Credits)
                        </label>
                        <input
                            type="number"
                            name="subscriptionCredits"
                            value={config.subscriptionCredits}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            min="0"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Base credit limit for subscribed users (can be overridden by plan specific logic later).
                        </p>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                        >
                            {saving ? 'Saving...' : 'Save Configuration'}
                        </button>
                    </div>

                    {message && (
                        <div className={`mt-4 p-4 rounded-md ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
