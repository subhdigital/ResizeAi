'use client';

import { useState } from 'react';
import Navbar from '@/components/user/Navbar';
import FileUpload from '@/components/common/FileUpload';
import { motion, AnimatePresence } from 'framer-motion';
import CreditExhaustedModal from '@/components/modals/CreditExhaustedModal';

export default function WatermarkPage() {
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [watermarkType, setWatermarkType] = useState<'text' | 'image'>('text');
    const [watermarkImage, setWatermarkImage] = useState<File | null>(null);

    // Text Watermark State
    const [text, setText] = useState('');
    const [textColor, setTextColor] = useState('#ffffff');
    const [textSize, setTextSize] = useState(10);
    const [opacity, setOpacity] = useState(0.8);

    const [position, setPosition] = useState('center');
    const [processing, setProcessing] = useState(false);
    const [result, setResult] = useState<{ url: string } | null>(null);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [showCreditModal, setShowCreditModal] = useState(false);

    const handleWatermark = async () => {
        if (!mainImage) return;
        if (watermarkType === 'image' && !watermarkImage) return;
        if (watermarkType === 'text' && !text) return;

        setProcessing(true);
        const formData = new FormData();
        formData.append('image', mainImage);
        formData.append('type', watermarkType);
        formData.append('gravity', position);

        if (watermarkType === 'text') {
            formData.append('text', text);
            formData.append('textColor', textColor);
            formData.append('textSize', textSize.toString());
            formData.append('opacity', opacity.toString());
        } else {
            formData.append('watermark', watermarkImage!);
        }

        try {
            const res = await fetch('/api/process/watermark', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                // Check if error is due to insufficient credits
                if (res.status === 402) {
                    setShowCreditModal(true);
                    throw new Error('Insufficient credits');
                }
                throw new Error('Failed to process image');
            }

            const blob = await res.blob();
            const downloadUrl = URL.createObjectURL(blob);
            setResult({ url: downloadUrl });
        } catch (error: any) {
            console.error(error);
            if (error.message !== 'Insufficient credits') {
                alert('Error processing image');
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans">
            <CreditExhaustedModal
                isOpen={showCreditModal}
                onClose={() => setShowCreditModal(false)}
            />

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

                                <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-slate-100 flex flex-col">
                                    <div className="text-center p-4 mb-4">
                                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-2">2. Watermark</h3>
                                    </div>

                                    <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                                        <button
                                            onClick={() => setWatermarkType('text')}
                                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${watermarkType === 'text' ? 'bg-white shadow-sm text-blue-600 border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            Text
                                        </button>
                                        <button
                                            onClick={() => setWatermarkType('image')}
                                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${watermarkType === 'image' ? 'bg-white shadow-sm text-blue-600 border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            Image
                                        </button>
                                    </div>

                                    <div className="flex-1">
                                        {watermarkType === 'image' ? (
                                            <FileUpload onFilesSelected={(files) => setWatermarkImage(files[0])} maxFiles={1} title="Select Watermark Image" />
                                        ) : (
                                            <div className="space-y-6 px-2">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Content</label>
                                                    <input
                                                        type="text"
                                                        value={text}
                                                        onChange={(e) => setText(e.target.value)}
                                                        placeholder="Enter watermark text..."
                                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Color</label>
                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type="color"
                                                                value={textColor}
                                                                onChange={(e) => setTextColor(e.target.value)}
                                                                className="h-10 w-10 rounded-lg cursor-pointer border-0 p-0"
                                                            />
                                                            <span className="text-sm font-medium text-slate-600">{textColor}</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Size ({textSize}%)</label>
                                                        <input
                                                            type="range"
                                                            min="1"
                                                            max="50"
                                                            value={textSize}
                                                            onChange={(e) => setTextSize(parseInt(e.target.value))}
                                                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Opacity ({Math.round(opacity * 100)}%)</label>
                                                    <input
                                                        type="range"
                                                        min="0.1"
                                                        max="1"
                                                        step="0.1"
                                                        value={opacity}
                                                        onChange={(e) => setOpacity(parseFloat(e.target.value))}
                                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Only show controls if valid inputs are present */}
                            {(mainImage && (watermarkType === 'text' ? text : watermarkImage)) && (
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
                                <div className="mb-8 p-4 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center">
                                    <img
                                        src={result.url}
                                        alt="Watermarked preview"
                                        onClick={() => setIsOverlayOpen(true)}
                                        className="max-h-[400px] w-auto h-auto object-contain rounded-2xl shadow-sm cursor-zoom-in hover:opacity-90 transition-opacity"
                                    />
                                </div>
                                <a
                                    href={result.url}
                                    download="watermarked_image.png"
                                    className="block w-full py-5 bg-[#00d4ff] text-white font-black text-xl rounded-2xl bg-[#00d4ff] shadow-[0_10px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.5)] transition-all hover:-translate-y-1"
                                >
                                    Download protected IMAGE
                                </a>
                            </div>
                            <button
                                onClick={() => { setResult(null); setMainImage(null); setWatermarkImage(null); setText(''); }}
                                className="px-8 py-4 text-slate-500 font-bold hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"
                            >
                                ← Protect another
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
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
