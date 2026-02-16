'use client';

import { useState } from 'react';
import Navbar from '@/components/user/Navbar';
import FileUpload from '@/components/common/FileUpload';
import { motion, AnimatePresence } from 'framer-motion';

export default function BatchPage() {
    const [files, setFiles] = useState<File[]>([]);
    const [quality, setQuality] = useState(70);
    const [processing, setProcessing] = useState(false);
    const [resultUrl, setResultUrl] = useState<string | null>(null);

    const handleBatchProcess = async () => {
        if (files.length === 0) return;

        setProcessing(true);
        const formData = new FormData();
        files.forEach(f => formData.append('images', f));
        formData.append('quality', quality.toString());

        try {
            const res = await fetch('/api/process/batch', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Batch failed');

            const blob = await res.blob();
            const downloadUrl = URL.createObjectURL(blob);
            setResultUrl(downloadUrl);
        } catch (error) {
            console.error(error);
            alert('Error during batch processing');
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
                            Batch <span className="text-blue-600">PROCESSING</span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            Optimize multiple images at once and download them all in a single ZIP file.
                        </p>
                    </motion.div>
                </div>

                <AnimatePresence mode="wait">
                    {!resultUrl ? (
                        <motion.div
                            key="selection"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="max-w-4xl mx-auto"
                        >
                            <div className="bg-white p-2 rounded-[2.5rem] shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-slate-100 mb-12">
                                <FileUpload onFilesSelected={setFiles} maxFiles={20} title="Upload Images for Bulk Compression" />
                            </div>

                            {files.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="max-w-2xl mx-auto bg-white p-10 rounded-[2.5rem] shadow-[0_20px_40px_rgb(0,0,0,0.04)] border border-slate-100"
                                >
                                    <div className="space-y-8">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                <label className="text-sm font-black uppercase tracking-wider text-slate-500">Compression Quality</label>
                                                <span className="text-blue-600 font-black text-xl">{quality}%</span>
                                            </div>
                                            <div className="pt-4 px-2">
                                                <input
                                                    type="range"
                                                    min="10"
                                                    max="90"
                                                    value={quality}
                                                    onChange={(e) => setQuality(parseInt(e.target.value))}
                                                    className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 transition-all"
                                                />
                                                <div className="flex justify-between text-xs font-bold text-slate-300 mt-2 uppercase tracking-wide">
                                                    <span>Small Size</span>
                                                    <span>Best Quality</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleBatchProcess}
                                            disabled={processing}
                                            className="w-full py-5 text-white font-black text-xl rounded-2xl bg-[#00d4ff] shadow-[0_10px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.5)] transition-all bg-[#00d4ff] hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {processing ? (
                                                <span className="flex items-center justify-center space-x-2">
                                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                                    <span>Processing Batch...</span>
                                                </span>
                                            ) : `Process ${files.length} IMAGES`}
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
                                    📦
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Your ZIP file is ready!</h2>
                                <a
                                    href={resultUrl}
                                    download="processed_images.zip"
                                    className="block w-full py-5 bg-[#00d4ff] text-white font-black text-xl rounded-2xl bg-[#00d4ff] shadow-[0_10px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.5)] transition-all hover:-translate-y-1"
                                >
                                    Download ZIP Archive
                                </a>
                            </div>
                            <button
                                onClick={() => { setResultUrl(null); setFiles([]); }}
                                className="px-8 py-4 text-slate-500 font-bold hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"
                            >
                                ← Batch process more
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
