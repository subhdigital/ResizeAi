'use client';

import { useState } from 'react';
import Navbar from '@/components/user/Navbar';
import FileUpload from '@/components/common/FileUpload';
import { motion, AnimatePresence } from 'framer-motion';

export default function MergePage() {
    const [files, setFiles] = useState<File[]>([]);
    const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal');
    const [processing, setProcessing] = useState(false);
    const [result, setResult] = useState<{ url: string } | null>(null);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const handleMerge = async () => {
        if (files.length < 2) return;

        setProcessing(true);
        const formData = new FormData();
        files.forEach(f => formData.append('images', f));
        formData.append('layout', layout);

        try {
            const res = await fetch('/api/process/merge', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Failed to process image');

            const blob = await res.blob();
            const downloadUrl = URL.createObjectURL(blob);
            setResult({ url: downloadUrl });
        } catch (error) {
            console.error(error);
            alert('Error processing image');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans">


            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-6">
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-medium  mb-8 tracking-tighter leading-[1.1] text-[#333]">
                            Merge <span className="text-[#00d4ff]">IMAGES</span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            Combine multiple images into one horizontally or vertically.
                        </p>
                    </motion.div>
                </div>

                <AnimatePresence mode="wait">
                    {!result ? (
                        <motion.div
                            key="selection"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="max-w-4xl mx-auto"
                        >
                            <div className="bg-white p-2 rounded-[2.5rem] shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-slate-100 mb-12">
                                <FileUpload onFilesSelected={setFiles} maxFiles={5} title="Upload 2+ Images to Merge" />
                            </div>

                            {files.length >= 2 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="max-w-2xl mx-auto bg-white p-10 rounded-[2.5rem] shadow-[0_20px_40px_rgb(0,0,0,0.04)] border border-slate-100"
                                >
                                    <div className="space-y-8">
                                        <div className="space-y-4">
                                            <p className="text-sm font-black uppercase tracking-wider text-slate-400">Layout Selection</p>
                                            <div className="grid grid-cols-2 gap-6">
                                                <button
                                                    onClick={() => setLayout('horizontal')}
                                                    className={`py-6 rounded-2xl font-bold transition-all border-2 flex flex-col items-center space-y-3 ${layout === 'horizontal'
                                                        ? 'bg-[#00d4ff] border-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                                                        : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-blue-200 hover:text-blue-600'}`}
                                                >
                                                    <span className="text-4xl bg-white/20 p-2 rounded-lg">↔️</span>
                                                    <span className="text-lg">Horizontal</span>
                                                </button>
                                                <button
                                                    onClick={() => setLayout('vertical')}
                                                    className={`py-6 rounded-2xl font-bold transition-all border-2 flex flex-col items-center space-y-3 ${layout === 'vertical'
                                                        ? 'bg-[#00d4ff] border-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                                                        : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-blue-200 hover:text-blue-600'}`}
                                                >
                                                    <span className="text-4xl bg-white/20 p-2 rounded-lg">↕️</span>
                                                    <span className="text-lg">Vertical</span>
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleMerge}
                                            disabled={processing}
                                            className="w-full py-5 text-white font-black text-xl rounded-2xl bg-[#00d4ff] shadow-[0_10px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.5)] transition-all bg-[#00d4ff] hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {processing ? (
                                                <span className="flex items-center justify-center space-x-2">
                                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                                    <span>Merging...</span>
                                                </span>
                                            ) : `Merge ${files.length} IMAGES`}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-2xl mx-auto text-center"
                        >
                            <div className="bg-white p-12 rounded-[3rem] shadow-[0_30px_60px_rgb(0,0,0,0.05)] border border-slate-100 mb-8">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-sm">
                                    🧩
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Images Merged!</h2>
                                <div className="mb-8 p-4 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center">
                                    <img
                                        src={result.url}
                                        alt="Merged preview"
                                        onClick={() => setIsOverlayOpen(true)}
                                        className="max-h-[400px] w-auto h-auto object-contain rounded-2xl shadow-sm cursor-zoom-in hover:opacity-90 transition-opacity"
                                    />
                                </div>
                                <a
                                    href={result.url}
                                    download="merged_image.png"
                                    className="block w-full py-5 bg-[#00d4ff] text-white font-black text-xl rounded-2xl bg-[#00d4ff] shadow-[0_10px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.5)] transition-all hover:-translate-y-1"
                                >
                                    Download merged IMAGE
                                </a>
                            </div>
                            <button
                                onClick={() => { setResult(null); setFiles([]); }}
                                className="px-8 py-4 text-slate-500 font-bold hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"
                            >
                                ← Merge more images
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Image Overlay Modal */}
            <AnimatePresence>
                {isOverlayOpen && result && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOverlayOpen(false)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
                    >
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={result.url}
                            alt="Full size preview"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            onClick={() => setIsOverlayOpen(false)}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
                        >
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
