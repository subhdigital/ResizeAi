'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const faqs = [
    {
        question: 'How does the AI optimization work?',
        answer: 'Our AI analyzes each image to determine the optimal compression level, format (WebP, AVIF, or original), and quality settings. It ensures maximum file size reduction while maintaining visual quality that\'s indistinguishable from the original.',
    },
    {
        question: 'What image formats are supported?',
        answer: 'We support JPG, PNG, WebP, and GIF formats. Our AI can automatically convert images to WebP or AVIF if it results in smaller file sizes.',
    },
    {
        question: 'Is there a file size limit?',
        answer: 'Yes, the maximum file size per image is 10MB. For bulk uploads, you can process up to 20 images at once.',
    },
    {
        question: 'How secure is my data?',
        answer: 'Your images are processed securely and automatically deleted from our servers after download. We never store your images permanently or use them for any other purpose.',
    },
    {
        question: 'Can I use the API for my website or app?',
        answer: 'Yes! Pro and Enterprise plans include API access. You can integrate our image optimization directly into your workflow or WordPress site.',
    },
    {
        question: 'What happens when I run out of credits?',
        answer: 'You can purchase additional credits anytime by upgrading your plan. Credits never expire, so you can use them at your own pace.',
    },
    {
        question: 'Do you offer refunds?',
        answer: 'Yes, we offer a 7-day money-back guarantee if you\'re not satisfied with the service. No questions asked.',
    },
    {
        question: 'How does background removal work?',
        answer: 'Background removal uses advanced AI to detect and remove backgrounds from images. It costs 5 credits per image and returns a transparent PNG file.',
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="faq">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="faq__header"
                >
                    <h2 className="faq__title">
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h2>
                    <p className="faq__subtitle">
                        Everything you need to know about our image optimization platform
                    </p>
                </motion.div>

                <div className="faq__list">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.4 }}
                            className="faq__item"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="faq__button"
                            >
                                <span className="faq__question">
                                    {faq.question}
                                </span>
                                <svg
                                    className={`faq__icon ${openIndex === index ? 'faq__icon--open' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            <motion.div
                                initial={false}
                                animate={{
                                    height: openIndex === index ? 'auto' : 0,
                                    opacity: openIndex === index ? 1 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="faq__content"
                            >
                                <div className="faq__answer">
                                    {faq.answer}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="faq__footer"
                >
                    <p className="faq__footer-text">
                        Still have questions?
                    </p>
                    <a
                        href="mailto:support@imageoptimizer.com"
                        className="faq__contact-btn"
                    >
                        Contact Support
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
