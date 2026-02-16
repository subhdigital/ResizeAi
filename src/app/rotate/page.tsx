'use client';

import { useState } from 'react';
import Navbar from '@/components/user/Navbar';
import FileUpload from '@/components/common/FileUpload';
import { motion, AnimatePresence } from 'framer-motion';

export default function RotatePage() {
    const [files, setFiles] = useState<File[]>([]);
    const [angle, setAngle] = useState(0);
    const [processing, setProcessing] = useState(false);
    const [result, setResult] = useState<{ url: string } | null>(null);

    const handleRotate = async () => {
        if (files.length === 0) return;

        setProcessing(true);
        const formData = new FormData();
        formData.append('image', files[0]);
        formData.append('rotate', angle.toString());

        try {
            const res = await fetch('/api/process/rotate', {
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
                            Rotate <span className="text-[#00d4ff]">IMAGE</span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            Rotate your images to left or right. It's fast and easy!
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
                                <FileUpload onFilesSelected={setFiles} maxFiles={1} title="Upload Image to Rotate" />
                            </div>

                            {files.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="max-w-2xl mx-auto bg-white p-10 rounded-[2.5rem] shadow-[0_20px_40px_rgb(0,0,0,0.04)] border border-slate-100"
                                >
                                    <div className="space-y-10">
                                        <div className="flex justify-center items-center gap-8">
                                            <button
                                                onClick={() => setAngle((angle - 90) % 360)}
                                                className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl hover:bg-blue-50 hover:text-blue-600 transition-all hover:scale-105 active:scale-95 shadow-sm border border-slate-200"
                                                title="Rotate Left"
                                            >
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                                </svg>
                                            </button>

                                            <div className="text-center w-32">
                                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Angle</p>
                                                <div className="text-5xl font-black text-slate-900 tabular-nums tracking-tight">
                                                    {angle}&deg;
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setAngle((angle + 90) % 360)}
                                                className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl hover:bg-blue-50 hover:text-blue-600 transition-all hover:scale-105 active:scale-95 shadow-sm border border-slate-200"
                                                title="Rotate Right"
                                            >
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 10H11a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
                                                </svg>
                                            </button>
                                        </div>

                                        <button
                                            onClick={handleRotate}
                                            disabled={processing}
                                            className="w-full py-5 text-white font-black text-xl rounded-2xl bg-[#00d4ff] shadow-[0_10px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.5)] transition-all bg-[#00d4ff] hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {processing ? (
                                                <span className="flex items-center justify-center space-x-2">
                                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                                    <span>Rotating...</span>
                                                </span>
                                            ) : 'Rotate IMAGE'}
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
                                <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-sm rotate-12">
                                    🔃
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Image has been rotated!</h2>
                                <a
                                    href={result.url}
                                    download={`rotated_${files[0].name}`}
                                    className="block w-full py-5 bg-[#00d4ff] text-white font-black text-xl rounded-2xl bg-[#00d4ff] shadow-[0_10px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.5)] transition-all hover:-translate-y-1"
                                >
                                    Download rotated IMAGE
                                </a>
                            </div>
                            <button
                                onClick={() => { setResult(null); setFiles([]); setAngle(0); }}
                                className="px-8 py-4 text-slate-500 font-bold hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"
                            >
                                ← Rotate another image
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
