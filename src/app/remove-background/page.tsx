'use client';

import { useState } from 'react';
import Navbar from '@/components/user/Navbar';
import FileUpload from '@/components/common/FileUpload';
import { motion, AnimatePresence } from 'framer-motion';

export default function RemoveBgPage() {
    const [files, setFiles] = useState<File[]>([]);
    const [processing, setProcessing] = useState(false);
    const [result, setResult] = useState<{ url: string; name: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleRemoveBg = async () => {
        if (files.length === 0) return;

        setProcessing(true);
        setError(null);

        const formData = new FormData();
        formData.append('image', files[0]);

        try {
            const res = await fetch('/api/process/remove-background', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || errorData.error || 'Failed to process image');
            }

            const blob = await res.blob();
            const downloadUrl = URL.createObjectURL(blob);

            setResult({
                url: downloadUrl,
                name: `no_bg_${files[0].name.split('.')[0]}.png`
            });
        } catch (error: any) {
            console.error(error);
            setError(error.message || 'Error processing image');
        } finally {
            setProcessing(false);
        }
    };

    const downloadImage = () => {
        if (!result) return;
        const link = document.createElement('a');
        link.href = result.url;
        link.download = result.name;
        link.click();
    };

    const reset = () => {
        setResult(null);
        setFiles([]);
        setError(null);
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
                        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full border border-blue-100">
                            AI Powered
                        </span>
                        <h1 className="text-5xl md:text-6xl font-medium  mb-8 tracking-tighter leading-[1.1] text-[#333]">
                            Remove <span className="text-blue-600">Background</span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            Professional quality background removal in seconds. 100% automatic and free.
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
                            <div className="bg-white p-2 rounded-[2.5rem] shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-slate-100">
                                <FileUpload
                                    onFilesSelected={setFiles}
                                    maxFiles={1}
                                    title="Upload or drop your photo here"
                                />
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-center font-medium shadow-sm"
                                >
                                    ⚠️ {error}
                                </motion.div>
                            )}

                            {files.length > 0 && !processing && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-10 flex justify-center"
                                >
                                    <button
                                        onClick={handleRemoveBg}
                                        className="group relative px-12 py-6 bg-[#00d4ff] text-white font-black text-xl rounded-full bg-[#00d4ff] transition-all shadow-[0_10px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.5)] hover:-translate-y-1 active:translate-y-0"
                                    >
                                        Remove Background
                                        <span className="absolute -top-2 -right-2 bg-yellow-400 text-slate-900 text-[10px] px-2 py-1 rounded-full font-black animate-bounce shadow-sm">AI</span>
                                    </button>
                                </motion.div>
                            )}

                            {processing && (
                                <div className="mt-16 text-center">
                                    <div className="inline-block relative w-24 h-24 mb-8">
                                        <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                                        <div className="absolute inset-0 flex items-center justify-center text-3xl">✨</div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 animate-pulse">
                                        AI is working its magic...
                                    </h3>
                                    <p className="text-slate-500 mt-3 font-medium">This usually takes 3-5 seconds</p>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
                        >
                            <div className="space-y-8 order-2 md:order-1">
                                <div className="p-10 bg-white rounded-[3rem] shadow-[0_30px_60px_rgb(0,0,0,0.05)] border border-slate-100">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm">
                                        🎉
                                    </div>
                                    <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Background Removed!</h2>
                                    <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                                        Your transparent PNG is ready. We've optimized the edges for the best results using our advanced AI.
                                    </p>

                                    <div className="flex flex-col gap-4">
                                        <button
                                            onClick={downloadImage}
                                            className="w-full py-5 bg-[#00d4ff] text-white font-black text-xl rounded-2xl bg-[#00d4ff] shadow-[0_10px_30px_rgb(37,99,235,0.2)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.4)] transition-all flex items-center justify-center space-x-3 hover:-translate-y-1"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            <span>Download Result</span>
                                        </button>
                                        <button
                                            onClick={reset}
                                            className="w-full py-5 bg-slate-50 text-slate-700 font-bold rounded-2xl hover:bg-slate-100 transition-all border border-slate-100"
                                        >
                                            Process another image
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="order-1 md:order-2">
                                <div className="relative aspect-square bg-[#ffffff] rounded-[3rem] overflow-hidden shadow-[0_30px_80px_rgb(0,0,0,0.1)] group border-[12px] border-white">
                                    {/* Checkerboard background for transparency preview */}
                                    <div className="absolute inset-0 opacity-[0.08]" style={{
                                        backgroundImage: 'radial-gradient(#000 20%, transparent 20%), radial-gradient(#000 20%, transparent 20%)',
                                        backgroundPosition: '0 0, 10px 10px',
                                        backgroundSize: '20px 20px'
                                    }}></div>

                                    <div className="absolute inset-0 flex items-center justify-center p-8">
                                        <img
                                            src={result.url}
                                            alt="Result"
                                            className="max-w-full max-h-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>


        </div>
    );
}
