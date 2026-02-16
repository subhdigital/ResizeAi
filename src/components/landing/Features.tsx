'use client';

import { motion } from 'framer-motion';

const features = [
    {
        icon: '🎯',
        title: 'AI-Powered Optimization',
        description: 'Our advanced AI automatically selects the best compression level and format for each image, ensuring maximum size reduction with zero quality loss.',
    },
    {
        icon: '⚡',
        title: 'Lightning Fast',
        description: 'Process images in seconds with our optimized infrastructure. Bulk upload support for processing hundreds of images at once.',
    },
    {
        icon: '🎨',
        title: 'Smart Format Conversion',
        description: 'Automatically convert to WebP or AVIF when it results in smaller file sizes while maintaining visual quality.',
    },
    {
        icon: '✂️',
        title: 'Background Removal',
        description: 'Remove backgrounds from images with AI precision. Perfect for product photos, portraits, and marketing materials.',
    },
    {
        icon: '📐',
        title: 'Smart Resize Presets',
        description: 'One-click resize for Instagram, LinkedIn, and web. Custom dimensions supported for any use case.',
    },
    {
        icon: '🔌',
        title: 'Public API Access',
        description: 'Integrate image optimization into your workflow with our RESTful API. WordPress plugin ready.',
    },
    {
        icon: '📊',
        title: 'Detailed Analytics',
        description: 'Track compression history, savings, and API usage with comprehensive dashboard analytics.',
    },
    {
        icon: '🔒',
        title: 'Secure & Private',
        description: 'Your images are processed securely and automatically deleted after download. We never store your data.',
    },
];

export default function Features() {
    return (
        <section id="features" className="features">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="features__header"
                >
                    <h2 className="features__title">
                        Powerful Features for{' '}
                        <span className="gradient-text">Every Need</span>
                    </h2>
                    <p className="features__subtitle">
                        Everything you need to optimize, resize, and transform your images with professional results
                    </p>
                </motion.div>

                <div className="features__grid">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="features__card"
                        >
                            <div className="features__card-icon">
                                {feature.icon}
                            </div>
                            <h3 className="features__card-title">
                                {feature.title}
                            </h3>
                            <p className="features__card-description">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
