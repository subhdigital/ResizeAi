'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';

interface FileUploadProps {
    onFilesSelected: (files: File[]) => void;
    maxFiles?: number;
    accept?: Record<string, string[]>;
    title?: string;
}

export default function FileUpload({
    onFilesSelected,
    maxFiles = 10,
    accept = { 'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'] },
    title = "Select Images"
}: FileUploadProps) {
    const [previews, setPreviews] = useState<{ name: string; url: string; size: number }[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newPreviews = acceptedFiles.map(file => ({
            name: file.name,
            url: URL.createObjectURL(file),
            size: file.size
        }));
        setPreviews(prev => [...prev, ...newPreviews].slice(0, maxFiles));
        onFilesSelected(acceptedFiles);
    }, [onFilesSelected, maxFiles]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        maxFiles
    });

    const removeFile = (index: number) => {
        setPreviews(prev => {
            const newPreviews = [...prev];
            URL.revokeObjectURL(newPreviews[index].url);
            newPreviews.splice(index, 1);
            return newPreviews;
        });
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="w-full">
            <div
                {...getRootProps()}
                className={`relative group cursor-pointer rounded-3xl border-4 border-dashed transition-all duration-300 p-12 text-center 
                    ${isDragActive
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
            >
                <input {...getInputProps()} />

                <div className="space-y-4">
                    <div className="mx-auto w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">
                        📁
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h3>
                        <p className="text-slate-500 dark:text-slate-400">
                            or drag and drop your images here
                        </p>
                    </div>
                    <button className="px-8 py-3 bg-[#00d4ff] text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-[#00d4ff] transition-colors">
                        Select files
                    </button>
                    <p className="text-xs text-slate-400">
                        Max file size: 10MB. Supports JPG, PNG, WebP, GIF.
                    </p>
                </div>
            </div>

            <AnimatePresence>
                {previews.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                    >
                        {previews.map((file, idx) => (
                            <motion.div
                                key={file.url}
                                layout
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="relative group rounded-2xl overflow-hidden aspect-square border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                            >
                                <img
                                    src={file.url}
                                    alt={file.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                                    <p className="text-[10px] text-white font-medium truncate w-full mb-1">{file.name}</p>
                                    <p className="text-[10px] text-slate-300 mb-2">{formatSize(file.size)}</p>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                                        className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
