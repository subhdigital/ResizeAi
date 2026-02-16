'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const plans = [
    {
        name: 'Free',
        price: '₹0',
        period: 'forever',
        credits: 10,
        features: [
            '10 image optimizations',
            'Basic compression',
            'Resize presets',
            'WebP conversion',
            'Email support',
        ],
        cta: 'Get Started',
        href: '/register',
        popular: false,
    },
    {
        name: 'Pro',
        price: '₹999',
        period: 'one-time',
        credits: 1000,
        features: [
            '1,000 image optimizations',
            'AI-powered optimization',
            'Background removal',
            'Bulk upload (ZIP)',
            'API access',
            'Priority support',
            'Advanced analytics',
        ],
        cta: 'Upgrade to Pro',
        href: '/register?plan=pro',
        popular: true,
    },
    {
        name: 'Enterprise',
        price: '₹4,999',
        period: 'one-time',
        credits: 10000,
        features: [
            '10,000 image optimizations',
            'Everything in Pro',
            'Dedicated API key',
            'WordPress plugin',
            'Custom integrations',
            'White-label option',
            'Dedicated support',
            'SLA guarantee',
        ],
        cta: 'Go Enterprise',
        href: '/register?plan=enterprise',
        popular: false,
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="pricing">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="pricing__header"
                >
                    <h2 className="pricing__title">
                        Simple, <span className="gradient-text">Transparent Pricing</span>
                    </h2>
                    <p className="pricing__subtitle">
                        Choose the perfect plan for your needs. No hidden fees, no subscriptions.
                    </p>
                </motion.div>

                <div className="pricing__grid">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className={`pricing__card ${plan.popular ? 'pricing__card--popular' : ''}`}
                        >
                            {plan.popular && (
                                <div className="pricing__popular-badge">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="pricing__card-header">
                                <h3 className="pricing__card-title">
                                    {plan.name}
                                </h3>
                                <div className="pricing__card-price">
                                    {plan.price}
                                </div>
                                <p className="pricing__card-period">
                                    {plan.period}
                                </p>
                                <p className="pricing__card-credits">
                                    {plan.credits} credits
                                </p>
                            </div>

                            <ul className="pricing__features">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="pricing__feature">
                                        <svg
                                            className="pricing__feature-icon"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span className="pricing__feature-text">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={plan.href}
                                className={plan.popular ? 'pricing__cta pricing__cta--outline' : 'pricing__cta pricing__cta--primary'}
                            >
                                {plan.cta}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="pricing__footer"
                >
                    <p>✨ All plans include secure processing and automatic file deletion</p>
                    <p>💳 One-time payment, no recurring charges</p>
                </motion.div>
            </div>
        </section>
    );
}
