'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploaderProps {
    preview?: boolean;
    onUpload?: (files: File[]) => void;
    multiple?: boolean;
}

export default function ImageUploader({ preview = false, onUpload, multiple = true }: ImageUploaderProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);

        // Create preview URLs
        const previewUrls = acceptedFiles.map(file => URL.createObjectURL(file));
        setPreviews(previewUrls);

        if (onUpload) {
            onUpload(acceptedFiles);
        }
    }, [onUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif']
        },
        multiple,
        maxSize: 10485760, // 10MB
    });

    const removeFile = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);
        setFiles(newFiles);
        setPreviews(newPreviews);

        if (onUpload) {
            onUpload(newFiles);
        }
    };

    return (
        <div className="uploader">
            <div
                {...getRootProps()}
                className={`uploader__dropzone ${isDragActive ? 'uploader__dropzone--active' : ''}`}
            >
                <input {...getInputProps()} />

                <motion.div
                    animate={isDragActive ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <svg
                        className="uploader__icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                    </svg>

                    {isDragActive ? (
                        <p className="uploader__title uploader__title--active">
                            Drop your images here...
                        </p>
                    ) : (
                        <>
                            <p className="uploader__title">
                                Drag & drop images here
                            </p>
                            <p className="uploader__subtitle">
                                or click to browse
                            </p>
                            <p className="uploader__hint">
                                Supports: JPG, PNG, WebP, GIF (Max 10MB)
                            </p>
                        </>
                    )}
                </motion.div>
            </div>

            {/* Preview Grid */}
            <AnimatePresence>
                {previews.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="uploader__grid"
                    >
                        {previews.map((preview, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ delay: index * 0.1 }}
                                className="uploader__preview-card"
                            >
                                <img
                                    src={preview}
                                    alt={`Preview ${index + 1}`}
                                    className="uploader__preview-img"
                                />

                                <div className="uploader__overlay">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFile(index);
                                        }}
                                        className="uploader__remove-btn"
                                    >
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <div className="uploader__info">
                                    <p className="uploader__filename">{files[index]?.name}</p>
                                    <p className="uploader__filesize">
                                        {(files[index]?.size / 1024).toFixed(1)} KB
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
