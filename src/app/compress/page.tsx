'use client';

import { useState } from 'react';
import Navbar from '@/components/user/Navbar';
import FileUpload from '@/components/common/FileUpload';
import { motion, AnimatePresence } from 'framer-motion';

export default function CompressPage() {
    const [files, setFiles] = useState<File[]>([]);
    const [quality, setQuality] = useState(70);
    const [processing, setProcessing] = useState(false);
    const [result, setResult] = useState<{ url: string; oldSize: number; newSize: number } | null>(null);

    const handleCompress = async () => {
        if (files.length === 0) return;

        setProcessing(true);
        const formData = new FormData();
        formData.append('image', files[0]);
        formData.append('quality', quality.toString());

        try {
            const res = await fetch('/api/process/compress', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Failed to process image');

            const blob = await res.blob();
            const downloadUrl = URL.createObjectURL(blob);

            setResult({
                url: downloadUrl,
                oldSize: files[0].size,
                newSize: blob.size,
            });
        } catch (error) {
            console.error(error);
            alert('Error processing image');
        } finally {
            setProcessing(false);
        }
    };

    const downloadImage = () => {
        if (!result) return;
        const link = document.createElement('a');
        link.href = result.url;
        link.download = `compressed_${files[0].name}`;
        link.click();
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + ['Bytes', 'KB', 'MB', 'GB'][i];
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
                            Compress <span className="text-[#00d4ff]">IMAGE</span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            Compress JPG, PNG, SVG, and GIF with the best quality and compression. Reduce file size while optimizing for maximal quality.
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
                                <FileUpload
                                    onFilesSelected={setFiles}
                                    maxFiles={1}
                                    title="Select images"
                                />
                            </div>

                            {files.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="max-w-2xl mx-auto bg-white p-10 rounded-[2.5rem] shadow-[0_20px_40px_rgb(0,0,0,0.04)] border border-slate-100"
                                >
                                    <div className="flex flex-col space-y-8">
                                        <div className="flex justify-between items-center">
                                            <label className="text-lg font-bold text-slate-900">Compression Level</label>
                                            <span className="text-2xl font-black text-blue-600 bg-blue-50 px-4 py-1 rounded-xl">{quality}%</span>
                                        </div>

                                        <div className="relative">
                                            <input
                                                type="range"
                                                min="10"
                                                max="95"
                                                value={quality}
                                                onChange={(e) => setQuality(parseInt(e.target.value))}
                                                className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600"
                                            />
                                            <div className="flex justify-between text-xs font-bold text-slate-400 mt-2 uppercase tracking-wider">
                                                <span>Better Quality</span>
                                                <span>Smaller Size</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleCompress}
                                            disabled={processing}
                                            className="w-full py-5 text-white font-black text-xl rounded-2xl bg-[#00d4ff] shadow-[0_10px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.5)] transition-all bg-[#00d4ff] hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {processing ? (
                                                <span className="flex items-center justify-center space-x-2">
                                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                                    <span>Compressing...</span>
                                                </span>
                                            ) : 'Compress IMAGE'}
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
                            className="max-w-3xl mx-auto bg-white p-12 rounded-[3rem] shadow-[0_30px_60px_rgb(0,0,0,0.05)] text-center border border-slate-100"
                        >
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-sm rotate-3">
                                🚀
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Images compressed!</h2>
                            <p className="text-slate-500 mb-10 text-lg">
                                We saved <span className="text-green-600 font-bold">{Math.round((1 - result.newSize / result.oldSize) * 100)}%</span> of your file size.
                            </p>

                            <div className="grid grid-cols-2 gap-6 mb-12">
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                    <p className="text-xs text-slate-400 uppercase font-black tracking-widest mb-2">Original</p>
                                    <p className="text-xl font-bold text-slate-500 line-through decoration-slate-300">{formatSize(result.oldSize)}</p>
                                </div>
                                <div className="p-6 bg-green-50 rounded-3xl border border-green-100">
                                    <p className="text-xs text-green-600 uppercase font-black tracking-widest mb-2">Compressed</p>
                                    <p className="text-2xl font-black text-green-600">{formatSize(result.newSize)}</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={downloadImage}
                                    className="flex-1 py-5 bg-[#00d4ff] text-white font-black text-xl rounded-2xl bg-[#00d4ff] shadow-[0_10px_30px_rgb(37,99,235,0.2)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.4)] transition-all flex items-center justify-center space-x-3 hover:-translate-y-1"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    <span>Download</span>
                                </button>
                                <button
                                    onClick={() => { setResult(null); setFiles([]); }}
                                    className="px-8 py-5 bg-slate-50 text-slate-700 font-bold rounded-2xl hover:bg-slate-100 transition-all border border-slate-100"
                                >
                                    Compress another
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
