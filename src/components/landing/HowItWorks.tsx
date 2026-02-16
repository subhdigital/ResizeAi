'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const steps = [
    {
        number: '01',
        title: 'Upload Your Images',
        description: 'Drag and drop or click to upload single or multiple images. Supports JPG, PNG, WebP, and GIF formats up to 10MB.',
        icon: '📤',
    },
    {
        number: '02',
        title: 'AI Processes Automatically',
        description: 'Our AI analyzes each image and applies the optimal compression, format conversion, and quality settings.',
        icon: '🤖',
    },
    {
        number: '03',
        title: 'Download Optimized Images',
        description: 'Get your optimized images instantly. Bulk uploads are automatically packaged into a convenient ZIP file.',
        icon: '⬇️',
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="how-it-works">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="how-it-works__header"
                >
                    <h2 className="how-it-works__title">
                        How It <span className="gradient-text">Works</span>
                    </h2>
                    <p className="how-it-works__subtitle">
                        Three simple steps to perfectly optimized images
                    </p>
                </motion.div>

                <div className="how-it-works__grid">
                    {/* Connection Lines */}
                    <div className="how-it-works__line" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className="how-it-works__step"
                        >
                            <div className="how-it-works__card">
                                {/* Step Number */}
                                <div className="how-it-works__number-badge">
                                    {index + 1}
                                </div>

                                {/* Icon */}
                                <div className="how-it-works__icon">
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <h3 className="how-it-works__card-title">
                                    {step.title}
                                </h3>
                                <p className="how-it-works__card-description">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="how-it-works__cta-wrapper"
                >
                    <Link
                        href="/register"
                        className="how-it-works__cta"
                    >
                        Start Optimizing Now
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
