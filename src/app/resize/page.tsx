'use client';

import { useState } from 'react';
import Navbar from '@/components/user/Navbar';
import FileUpload from '@/components/common/FileUpload';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResizePage() {
    const [files, setFiles] = useState<File[]>([]);
    const [width, setWidth] = useState<number | ''>('');
    const [height, setHeight] = useState<number | ''>('');
    const [processing, setProcessing] = useState(false);
    const [result, setResult] = useState<{ url: string } | null>(null);

    const handleResize = async () => {
        if (files.length === 0 || (!width && !height)) return;

        setProcessing(true);
        const formData = new FormData();
        formData.append('image', files[0]);
        if (width) formData.append('width', width.toString());
        if (height) formData.append('height', height.toString());

        try {
            const res = await fetch('/api/process/resize', {
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
                            Resize <span className="text-[#00d4ff]">IMAGE</span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            Change image dimensions by defining new height and width pixels.
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
                                <FileUpload onFilesSelected={setFiles} maxFiles={1} title="Select Image to Resize" />
                            </div>

                            {files.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="max-w-2xl mx-auto bg-white p-10 rounded-[2.5rem] shadow-[0_20px_40px_rgb(0,0,0,0.04)] border border-slate-100"
                                >
                                    <div className="grid grid-cols-2 gap-6 mb-8">
                                        <div className="space-y-2 group">
                                            <label className="text-xs font-black uppercase text-slate-400 tracking-wider group-focus-within:text-blue-600 transition-colors">Width</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    placeholder="Auto"
                                                    value={width}
                                                    onChange={(e) => setWidth(e.target.value ? parseInt(e.target.value) : '')}
                                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-700 placeholder:text-slate-300"
                                                />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium pointer-events-none">px</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className="text-xs font-black uppercase text-slate-400 tracking-wider group-focus-within:text-blue-600 transition-colors">Height</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    placeholder="Auto"
                                                    value={height}
                                                    onChange={(e) => setHeight(e.target.value ? parseInt(e.target.value) : '')}
                                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-700 placeholder:text-slate-300"
                                                />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium pointer-events-none">px</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleResize}
                                        disabled={processing || (!width && !height)}
                                        className="w-full py-5 text-white font-black text-xl rounded-2xl bg-[#00d4ff] shadow-[0_10px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.5)] transition-all bg-[#00d4ff] hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? (
                                            <span className="flex items-center justify-center space-x-2">
                                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                                <span>Resizing...</span>
                                            </span>
                                        ) : 'Resize IMAGE'}
                                    </button>
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
                                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-sm rotate-6">
                                    📐
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Image has been resized!</h2>
                                <a
                                    href={result.url}
                                    download={`resized_${files[0].name}`}
                                    className="block w-full py-5 bg-[#00d4ff] text-white font-black text-xl rounded-2xl bg-[#00d4ff] shadow-[0_10px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.5)] transition-all hover:-translate-y-1"
                                >
                                    Download resized IMAGE
                                </a>
                            </div>
                            <button
                                onClick={() => { setResult(null); setFiles([]); }}
                                className="px-8 py-4 text-slate-500 font-bold hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"
                            >
                                ← Resize another image
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
