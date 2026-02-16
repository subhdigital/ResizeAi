'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConvertPage() {
    const [files, setFiles] = useState<File[]>([]);
    const [targetFormat, setTargetFormat] = useState<'jpeg' | 'png' | 'webp' | 'avif'>('png');
    const [processing, setProcessing] = useState(false);
    const [result, setResult] = useState<{ url: string; format: string } | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Maintain single file flow as per current logic
        setFiles(acceptedFiles.slice(0, 1));
        setResult(null);
    }, []);

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        maxFiles: 1, // Restricting to 1 to match current logic
        accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'] },
        noClick: true // We have a custom Select Files button
    });

    const clearFiles = () => {
        setFiles([]);
        setResult(null);
    };

    const handleConvert = async () => {
        if (files.length === 0) return;

        setProcessing(true);
        const formData = new FormData();
        formData.append('image', files[0]);
        formData.append('format', targetFormat);

        try {
            const res = await fetch('/api/process/convert', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Failed to process image');

            const blob = await res.blob();
            const downloadUrl = URL.createObjectURL(blob);
            setResult({ url: downloadUrl, format: targetFormat });
        } catch (error) {
            console.error(error);
            alert('Error processing image');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-[#333] mt-20">
            {/* Header Section */}
            <header className="max-w-7xl mx-auto px-5 pt-12 pb-8 text-center md:text-left md:flex md:items-start md:justify-between gap-8 mt-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-medium mb-4 leading-tight">
                        {targetFormat === 'jpeg' ? 'Convert PNG to JPG' : targetFormat === 'png' ? 'Convert JPG to PNG' : `Convert to ${targetFormat.toUpperCase()}`}
                    </h1>
                    <p className="text-lg text-slate-500 mb-6 leading-relaxed">
                        {targetFormat === 'jpeg'
                            ? 'Transform PNG images to JPG for smaller file sizes and better compatibility. Ideal for photography.'
                            : targetFormat === 'png'
                                ? 'Transform JPG images to PNG for lossless quality and transparency support. Ideal for graphics.'
                                : `Transform images to ${targetFormat.toUpperCase()} for optimized quality and compatibility.`
                        }
                        {' '}<b>All processing happens securely</b>.
                    </p>
                    <ul className="text-sm text-slate-500 space-y-2 hidden md:block text-left">
                        <li className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-slate-400 rounded-full shrink-0"></span>
                            Click <b>SELECT FILES</b> to choose an image, or drag files to the drop area.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-slate-400 rounded-full shrink-0"></span>
                            Click <b>CONVERT</b> to start the conversion, then <b>SAVE</b> to download.
                        </li>
                    </ul>
                </div>
            </header>

            {/* Main App Area */}
            <div className="max-w-7xl mx-auto px-5 py-8">
                <div className="max-w-4xl mx-auto bg-[#f8f9fa] rounded-xl border border-dashed border-slate-300 p-8 min-h-[400px] relative flex flex-col">
                    <div className="flex justify-center md:justify-start overflow-x-auto space-x-1 py-1 mb-10 border-b border-slate-200">
                        <button
                            onClick={() => setTargetFormat('jpeg')}
                            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${targetFormat === 'jpeg' ? 'text-[#333] border-[#333] font-bold' : 'text-slate-500 border-transparent hover:text-[#333]'}`}
                        >
                            PNG to JPG
                        </button>
                        <button
                            onClick={() => setTargetFormat('png')}
                            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${targetFormat === 'png' ? 'text-[#333] border-[#333] font-bold' : 'text-slate-500 border-transparent hover:text-[#333]'}`}
                        >
                            JPG to PNG
                        </button>
                        {/* <button
                            onClick={() => setTargetFormat('webp')}
                            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${targetFormat === 'webp' ? 'text-[#333] border-[#333] font-bold' : 'text-slate-500 border-transparent hover:text-[#333]'}`}
                        >
                            to WebP
                        </button>
                        <button
                            onClick={() => setTargetFormat('avif')}
                            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${targetFormat === 'avif' ? 'text-[#333] border-[#333] font-bold' : 'text-slate-500 border-transparent hover:text-[#333]'}`}
                        >
                            to AVIF
                        </button> */}
                    </div>
                    {/* Top Buttons */}
                    <div className="flex items-center gap-4 mb-6 z-10">
                        <button
                            onClick={open}
                            className="flex items-center gap-2 px-6 py-3 bg-[#00d4ff] text-white font-bold text-sm rounded hover:bg-[#00c2ea] transition-colors uppercase tracking-wide shadow-sm"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" /><path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" /></svg>
                            Select Files
                        </button>

                        <button
                            onClick={clearFiles}
                            disabled={files.length === 0}
                            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-600 font-bold text-sm rounded hover:bg-slate-50 transition-colors uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" /><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg>
                            Clear
                        </button>
                    </div>

                    {/* Drop Zone / List */}
                    <div
                        {...getRootProps()}
                        className={`flex-1 rounded-xl transition-all duration-200 flex flex-col items-center justify-center p-8 relative
                            ${isDragActive ? 'bg-blue-50/50' : ''}`}
                    >
                        <input {...getInputProps()} />

                        {files.length > 0 ? (
                            <div className="w-full flex justify-start overflow-x-auto pb-4 gap-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="relative group w-48 bg-white rounded shadow-sm border border-slate-200 p-2 flex flex-col shrink-0"
                                >
                                    <div className="aspect-[4/5] bg-slate-100 rounded overflow-hidden relative mb-2 flex items-center justify-center">
                                        <img
                                            src={URL.createObjectURL(files[0])}
                                            alt="Preview"
                                            className="w-full h-full object-contain"
                                            onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                                        />
                                        {result && (
                                            <div className="absolute inset-0 bg-[#00d4ff]/90 flex items-center justify-center backdrop-blur-sm">
                                                <div className="text-center text-white">
                                                    <div className="text-3xl mb-1">✓</div>
                                                    <div className="font-bold text-sm">DONE</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="px-1">
                                        <p className="text-xs font-medium text-slate-700 truncate" title={files[0].name}>{files[0].name}</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5">{(files[0].size / 1024).toFixed(1)} KB</p>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); clearFiles(); }}
                                        className="absolute -top-2 -right-2 bg-white text-slate-400 hover:text-red-500 rounded-full p-1 shadow border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </motion.div>
                            </div>
                        ) : (
                            <div className="absolute inset-4 border-2 border-dashed border-slate-300 rounded-lg pointer-events-none flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-xl font-medium text-slate-400">Drop Your Files Here</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="mt-6 flex justify-start gap-4 z-10 border-t border-slate-200 pt-6">
                        {!result ? (
                            <button
                                onClick={handleConvert}
                                disabled={files.length === 0 || processing}
                                className="px-8 py-3 bg-[#333] text-white font-bold text-sm rounded shadow-md hover:bg-black transition-all flex items-center gap-2 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        Converting...
                                    </>
                                ) : (
                                    <>
                                        CONVERT
                                    </>
                                )}
                            </button>
                        ) : null}

                        <button
                            disabled={!result}
                            onClick={() => {
                                if (result) {
                                    const link = document.createElement('a');
                                    link.href = result.url;
                                    link.download = `converted_${files[0].name.split('.')[0]}.${result.format === 'jpeg' ? 'jpg' : result.format}`;
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }
                            }}
                            className="px-8 py-3 bg-[#28a745] text-white font-bold text-sm rounded shadow-md hover:bg-[#218838] transition-all flex items-center gap-2 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Save All
                        </button>
                    </div>
                </div>
            </div>

            {/* Article Section */}
            <article className="max-w-7xl mx-auto px-5 py-12 text-[#333]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">JPG to PNG: Complete Conversion Guide</h2>
                    <p className="mb-6 leading-relaxed text-slate-600">Converting JPG to PNG is a common need when you require lossless image quality or need to work with transparency. This guide explains when and why to convert, and how to do it securely in your browser.</p>

                    <div className="bg-[#e7f1ff] border-l-4 border-blue-500 p-4 mb-8">
                        <strong>Key Difference:</strong> JPG uses lossy compression (smaller files, some quality loss), while PNG is lossless (larger files, perfect quality preservation) and supports transparency.
                    </div>

                    <section id="why-convert" className="mb-10">
                        <h2 className="text-xl font-bold mb-4">Why Convert JPG to PNG?</h2>
                        <p className="mb-4 text-slate-600">There are several important reasons to convert JPG files to PNG format:</p>

                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold text-lg mb-1">Preserve Quality During Editing</h3>
                                <p className="text-slate-600">Every time you edit and save a JPG, it gets compressed again, gradually degrading quality. PNG files don't lose quality when saved, making them ideal for images that need multiple rounds of editing.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg mb-1">Prepare for Transparency</h3>
                                <p className="text-slate-600">If you plan to remove backgrounds or add transparent areas in photo editing software, you need to work with PNG. JPG doesn't support transparency—every pixel must have a color.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg mb-1">Better for Graphics and Text</h3>
                                <p className="text-slate-600">PNG handles sharp edges, text, and solid colors much better than JPG. Converting screenshots, diagrams, or images with text to PNG prevents the fuzzy artifacts that JPG compression creates.</p>
                            </div>
                        </div>

                        <div className="mt-6 bg-[#fff3cd] border-l-4 border-yellow-400 p-4">
                            <strong>Important:</strong> Converting JPG to PNG won't restore quality that was already lost during JPG compression. The PNG will perfectly preserve the current state of the image, including any existing artifacts.
                        </div>
                    </section>

                    <section id="jpg-vs-png" className="mb-10">
                        <h2 className="text-xl font-bold mb-4">JPG vs PNG: Which Format to Use?</h2>

                        <div className="overflow-x-auto border border-slate-200 rounded-lg">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="p-4 font-bold text-[#333] w-1/2">Use JPG When...</th>
                                        <th className="p-4 font-bold text-[#333] w-1/2">Use PNG When...</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-600 text-sm">
                                    <tr className="border-b border-slate-100">
                                        <td className="p-4">Storing photographs</td>
                                        <td className="p-4">Image needs transparent areas</td>
                                    </tr>
                                    <tr className="border-b border-slate-100 bg-slate-50/50">
                                        <td className="p-4">File size is critical</td>
                                        <td className="p-4">Quality must be preserved exactly</td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="p-4">Sharing on social media</td>
                                        <td className="p-4">Image contains text or UI elements</td>
                                    </tr>
                                    <tr className="border-b border-slate-100 bg-slate-50/50">
                                        <td className="p-4">Email attachments</td>
                                        <td className="p-4">Screenshots and diagrams</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">Web images (with WebP alternative)</td>
                                        <td className="p-4">Logos and graphics</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="how-to" className="mb-10">
                        <h2 className="text-xl font-bold mb-4">How to Convert JPG to PNG</h2>
                        <p className="mb-4 text-slate-600">Our converter makes the process fast and private:</p>

                        <ol className="list-decimal pl-5 space-y-2 text-slate-600 marker:font-bold marker:text-[#333]">
                            <li><strong>Select files</strong> — Click SELECT FILES or drag and drop up to 20 JPG images into the drop area</li>
                            <li><strong>Convert</strong> — Click CONVERT to process your images instantly in your browser</li>
                            <li><strong>Save</strong> — Save individual files or use SAVE ALL to get everything at once</li>
                        </ol>

                        <div className="mt-4 bg-[#d1ecf1] text-[#0c5460] border-l-4 border-[#17a2b8] p-4 text-sm">
                            <strong>Pro Tip:</strong> Converting to PNG will increase file size significantly—sometimes 5-10x larger. This is normal and expected because PNG doesn't use lossy compression.
                        </div>
                    </section>
                </div>
            </article>
        </div>
    );
}
