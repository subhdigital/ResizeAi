import 'server-only';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { removeBackground as imglyRemoveBackground } from '@imgly/background-removal-node';

export interface ImageProcessingOptions {
    quality?: number;
    width?: number;
    height?: number;
    format?: 'jpeg' | 'png' | 'webp' | 'avif' | 'gif';
    rotate?: number;
    crop?: {
        left: number;
        top: number;
        width: number;
        height: number;
    };
    watermark?: {
        image: Buffer;
        gravity?: string;
        opacity?: number;
    };
}

export interface ImageProcessingResult {
    buffer: Buffer;
    format: string;
    size: number;
    width: number;
    height: number;
}

export const RESIZE_PRESETS: Record<string, { width: number; height: number; fit: 'cover' | 'contain' }> = {
    'instagram-square': { width: 1080, height: 1080, fit: 'cover' },
    'instagram-portrait': { width: 1080, height: 1350, fit: 'cover' },
    'instagram-story': { width: 1080, height: 1920, fit: 'cover' },
    'facebook-post': { width: 1200, height: 630, fit: 'cover' },
    'facebook-cover': { width: 820, height: 312, fit: 'cover' },
    'twitter-post': { width: 1200, height: 675, fit: 'cover' },
    'twitter-header': { width: 1500, height: 500, fit: 'cover' },
    'linkedin-post': { width: 1200, height: 627, fit: 'cover' },
    'linkedin-cover': { width: 1128, height: 191, fit: 'cover' },
};

/**
 * Core processor that can chain multiple operations
 */
export async function processImage(
    inputBuffer: Buffer,
    options: ImageProcessingOptions
): Promise<ImageProcessingResult> {
    let pipeline = sharp(inputBuffer);

    // 1. Rotate
    if (options.rotate) {
        pipeline = pipeline.rotate(options.rotate);
    } else {
        pipeline = pipeline.rotate(); // Auto-rotate based on EXIF
    }

    // 2. Crop
    if (options.crop) {
        pipeline = pipeline.extract({
            left: options.crop.left,
            top: options.crop.top,
            width: options.crop.width,
            height: options.crop.height,
        });
    }

    // 3. Resize
    if (options.width || options.height) {
        pipeline = pipeline.resize(options.width, options.height, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        });
    }

    // 4. Watermark
    if (options.watermark) {
        // Calculate current dimensions to ensure watermark fits
        let currentW: number;
        let currentH: number;

        // Get initial dimensions (accounting for rotation)
        const meta = await sharp(inputBuffer).rotate(options.rotate).metadata();
        currentW = meta.width!;
        currentH = meta.height!;

        // Adjust for crop
        if (options.crop) {
            currentW = options.crop.width;
            currentH = options.crop.height;
        }

        // Adjust for resize
        if (options.width || options.height) {
            if (options.width && options.height) {
                currentW = options.width;
                currentH = options.height;
            } else if (options.width) {
                // Maintain aspect ratio
                currentH = Math.round(currentH * (options.width / currentW));
                currentW = options.width;
            } else if (options.height) {
                // Maintain aspect ratio
                currentW = Math.round(currentW * (options.height / currentH));
                currentH = options.height;
            }
        }

        // Resize watermark to fit within 50% of the image
        // using 'inside' preserves aspect ratio of the watermark
        // 'withoutEnlargement' prevents upscaling small watermarks
        const constraintW = Math.max(1, Math.round(currentW * 0.5));
        const constraintH = Math.max(1, Math.round(currentH * 0.5));

        const resizedWatermark = await sharp(options.watermark.image)
            .resize({
                width: constraintW,
                height: constraintH,
                fit: 'inside',
                withoutEnlargement: true
            })
            .toBuffer();

        pipeline = pipeline.composite([
            {
                input: resizedWatermark,
                gravity: (options.watermark.gravity as any) || 'center',
                blend: 'over'
            }
        ]);
    }

    // 5. Format & Quality
    const format = options.format || 'jpeg';
    const quality = options.quality || 80;

    if (format === 'webp') {
        pipeline = pipeline.webp({ quality });
    } else if (format === 'avif') {
        pipeline = pipeline.avif({ quality });
    } else if (format === 'png') {
        pipeline = pipeline.png({ quality: Math.min(quality, 100), compressionLevel: 9 });
    } else if (format === 'gif') {
        pipeline = pipeline.gif();
    } else {
        pipeline = pipeline.jpeg({ quality, mozjpeg: true });
    }

    const { data, info } = await pipeline.toBuffer({ resolveWithObject: true });

    return {
        buffer: data,
        format: info.format,
        size: data.length,
        width: info.width,
        height: info.height,
    };
}

/**
 * AI Background Removal
 * Processes background removal locally using @imgly/background-removal-node
 */
export async function removeBackground(buffer: Buffer): Promise<Buffer> {
    try {
        // imglyRemoveBackground handles the AI processing locally using ONNX
        const blob = await imglyRemoveBackground(buffer);
        const arrayBuffer = await blob.arrayBuffer();
        return Buffer.from(arrayBuffer);
    } catch (error: any) {
        console.error('Self-hosted BG removal error:', error);
        throw new Error('Failed to remove background locally: ' + error.message);
    }
}

/**
 * Specifically for compression
 */
export async function compressImage(buffer: Buffer, quality: number = 70): Promise<ImageProcessingResult> {
    return processImage(buffer, { quality });
}

/**
 * AI-Powered Optimization (Alias for advanced processing)
 */
export async function optimizeImage(
    buffer: Buffer,
    options: { quality?: number; autoFormat?: boolean; format?: string }
): Promise<ImageProcessingResult & { compressionRatio: number }> {
    const procOptions: ImageProcessingOptions = {
        quality: options.quality,
        format: (options.format as any) || (options.autoFormat ? 'webp' : undefined)
    };

    const result = await processImage(buffer, procOptions);

    const ratio = 1 - (result.size / buffer.length);

    return {
        ...result,
        compressionRatio: parseFloat(ratio.toFixed(2))
    };
}

/**
 * AI Wrapper for optimization with defaults (used by API routes)
 */
export async function aiOptimize(
    buffer: Buffer,
    options: { quality?: number; autoFormat?: boolean; format?: string } = {}
): Promise<ImageProcessingResult & { compressionRatio: number }> {
    return optimizeImage(buffer, {
        quality: options.quality || 80,
        autoFormat: options.autoFormat !== undefined ? options.autoFormat : true,
        format: options.format
    });
}

/**
 * Resize Image with Preset or Custom Dimensions
 */
export async function resizeImage(
    buffer: Buffer,
    options: string | { width: number; height: number; fit?: 'cover' | 'contain' }
): Promise<Buffer> {
    let resizeOptions: { width: number; height: number; fit?: 'cover' | 'contain' };

    if (typeof options === 'string') {
        if (!RESIZE_PRESETS[options]) throw new Error('Invalid resize preset');
        resizeOptions = RESIZE_PRESETS[options];
    } else {
        resizeOptions = options;
    }

    // We use sharp directly here for simpler resize logic distinct from processImage pipeline
    return sharp(buffer)
        .resize(resizeOptions.width, resizeOptions.height, {
            fit: resizeOptions.fit || 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .toBuffer();
}

/**
 * Create a transparent image to merge others onto
 */
export async function mergeImages(buffers: Buffer[], layout: 'horizontal' | 'vertical' = 'horizontal'): Promise<Buffer> {
    if (buffers.length === 0) throw new Error('No images to merge');
    if (buffers.length === 1) return buffers[0];

    const metadatas = await Promise.all(buffers.map(b => sharp(b).metadata()));

    let totalWidth = 0;
    let maxHeight = 0;
    let totalHeight = 0;
    let maxWidth = 0;

    metadatas.forEach(m => {
        totalWidth += m.width || 0;
        maxHeight = Math.max(maxHeight, m.height || 0);
        totalHeight += m.height || 0;
        maxWidth = Math.max(maxWidth, m.width || 0);
    });

    const canvas = sharp({
        create: {
            width: layout === 'horizontal' ? totalWidth : maxWidth,
            height: layout === 'horizontal' ? maxHeight : totalHeight,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
    });

    let currentOffset = 0;
    const composites = buffers.map((b, i) => {
        const top = layout === 'vertical' ? currentOffset : 0;
        const left = layout === 'horizontal' ? currentOffset : 0;
        currentOffset += (layout === 'horizontal' ? metadatas[i].width : metadatas[i].height) || 0;
        return { input: b, top, left };
    });

    return canvas.composite(composites).png().toBuffer();
}

export async function validateImageFile(buffer: Buffer): Promise<boolean> {
    try {
        const metadata = await sharp(buffer).metadata();
        return !!metadata.format;
    } catch (error) {
        return false;
    }
}

export function getImageMimeType(format: string): string {
    const mimeTypes: Record<string, string> = {
        jpeg: 'image/jpeg',
        jpg: 'image/jpeg',
        png: 'image/png',
        webp: 'image/webp',
        avif: 'image/avif',
        gif: 'image/gif',
    };

    return mimeTypes[format.toLowerCase()] || 'application/octet-stream';
}
