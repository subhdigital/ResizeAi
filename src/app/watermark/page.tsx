'use client';

import { useState } from 'react';
import Navbar from '@/components/user/Navbar';
import FileUpload from '@/components/common/FileUpload';
import { motion, AnimatePresence } from 'framer-motion';

export default function WatermarkPage() {
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [watermark, setWatermark] = useState<File | null>(null);
    const [position, setPosition] = useState('center');
    const [processing, setProcessing] = useState(false);
    const [result, setResult] = useState<{ url: string } | null>(null);

    const handleWatermark = async () => {
        if (!mainImage || !watermark) return;

        setProcessing(true);
        const formData = new FormData();
        formData.append('image', mainImage);
        formData.append('watermark', watermark);
        formData.append('gravity', position);

        try {
            const res = await fetch('/api/process/watermark', {
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
                            Add <span className="text-[#00d4ff]">WATERMARK</span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            Protect your images with an image or text watermark.
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
                            className="max-w-6xl mx-auto"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                <div className="bg-white p-2 rounded-[2.5rem] shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-slate-100">
                                    <div className="text-center p-4">
                                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-2">1. Main Image</h3>
                                    </div>
                                    <FileUpload onFilesSelected={(files) => setMainImage(files[0])} maxFiles={1} />
                                </div>
                                <div className="bg-white p-2 rounded-[2.5rem] shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-slate-100">
                                    <div className="text-center p-4">
                                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-2">2. Watermark</h3>
                                    </div>
                                    <FileUpload onFilesSelected={(files) => setWatermark(files[0])} maxFiles={1} title="Select Watermark" />
                                </div>
                            </div>

                            {(mainImage && watermark) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="max-w-2xl mx-auto bg-white p-10 rounded-[2.5rem] shadow-[0_20px_40px_rgb(0,0,0,0.04)] border border-slate-100"
                                >
                                    <div className="space-y-8">
                                        <div className="space-y-4">
                                            <p className="text-sm font-black uppercase tracking-wider text-slate-400">Position</p>
                                            <div className="relative">
                                                <select
                                                    value={position}
                                                    onChange={(e) => setPosition(e.target.value)}
                                                    className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-700 appearance-none cursor-pointer"
                                                >
                                                    <option value="center">Center</option>
                                                    <option value="north">Top</option>
                                                    <option value="south">Bottom</option>
                                                    <option value="east">Right</option>
                                                    <option value="west">Left</option>
                                                    <option value="northeast">Top Right</option>
                                                    <option value="southeast">Bottom Right</option>
                                                    <option value="northwest">Top Left</option>
                                                    <option value="southwest">Bottom Left</option>
                                                </select>
                                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleWatermark}
                                            disabled={processing}
                                            className="w-full py-5 text-white font-black text-xl rounded-2xl bg-[#00d4ff] shadow-[0_10px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.5)] transition-all bg-[#00d4ff] hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {processing ? (
                                                <span className="flex items-center justify-center space-x-2">
                                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                                    <span>Processing...</span>
                                                </span>
                                            ) : 'Apply Watermark'}
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
                                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-sm">
                                    ©️
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Watermark Applied!</h2>
                                <a
                                    href={result.url}
                                    download="watermarked_image.png"
                                    className="block w-full py-5 bg-[#00d4ff] text-white font-black text-xl rounded-2xl bg-[#00d4ff] shadow-[0_10px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.5)] transition-all hover:-translate-y-1"
                                >
                                    Download protected IMAGE
                                </a>
                            </div>
                            <button
                                onClick={() => { setResult(null); setMainImage(null); setWatermark(null); }}
                                className="px-8 py-4 text-slate-500 font-bold hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"
                            >
                                ← Protect another
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
