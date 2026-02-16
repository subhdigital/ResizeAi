'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ImageUploader from '@/components/dashboard/ImageUploader';

export default function Hero() {
    return (
        <section className="hero">
            {/* Animated Background Elements */}
            <div className="hero__bg-elements">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="hero__bg-elements-blob hero__bg-elements-blob--1"
                />
                <motion.div
                    animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    className="hero__bg-elements-blob hero__bg-elements-blob--2"
                />
            </div>

            <div className="hero__container">
                <div className="hero__grid">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero__content"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="hero__tag"
                        >
                            <span className="hero__tag-text">
                                ✨ AI-Powered Image Optimization
                            </span>
                        </motion.div>

                        <h1 className="hero__title">
                            Optimize Images <span>Instantly</span><br />with AI Power
                        </h1>

                        <p className="hero__description">
                            Compress, resize, and optimize your images with cutting-edge AI technology.
                            Reduce file sizes by up to 90% while maintaining perfect quality.
                        </p>

                        <div className="hero__actions">
                            <Link href="/register" className="btn-gradient btn-lg">
                                Start Optimizing Free
                            </Link>
                            <Link href="#features" className="btn-white btn-lg" style={{ border: '2px solid #e5e7eb' }}>
                                See How It Works
                            </Link>
                        </div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="hero__stats"
                        >
                            <div className="hero__stats-item">
                                <div className="hero__stats-item-value">90%</div>
                                <div className="hero__stats-item-label">Size Reduction</div>
                            </div>
                            <div className="hero__stats-item">
                                <div className="hero__stats-item-value">10M+</div>
                                <div className="hero__stats-item-label">Images Optimized</div>
                            </div>
                            <div className="hero__stats-item">
                                <div className="hero__stats-item-value">100%</div>
                                <div className="hero__stats-item-label">Quality Preserved</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Image Uploader Preview */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="hero__preview"
                    >
                        <div className="hero__preview-card">
                            <h3 className="text-2xl font-bold mb-4 text-center">Try It Now</h3>
                            <ImageUploader preview={true} />
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            className="hero__preview-badge hero__preview-badge--1"
                        >
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-sm font-medium">AI Processing</span>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="hero__preview-badge hero__preview-badge--2"
                        >
                            <div className="text-sm font-medium gradient-text">85% Smaller</div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute"
                style={{ bottom: '2rem', left: '50%', transform: 'translateX(-50%)' }}
            >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </motion.div>
        </section>
    );
}
