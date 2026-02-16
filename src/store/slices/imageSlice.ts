import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProcessedImage {
    id: string;
    originalSize: number;
    compressedSize: number;
    format: string;
    compressionRatio: number;
    downloadUrl: string;
    createdAt: string;
}

interface ImageState {
    uploadedImages: File[];
    processedImages: ProcessedImage[];
    isProcessing: boolean;
    currentOperation: string | null;
}

const initialState: ImageState = {
    uploadedImages: [],
    processedImages: [],
    isProcessing: false,
    currentOperation: null,
};

const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        setUploadedImages: (state, action: PayloadAction<File[]>) => {
            state.uploadedImages = action.payload;
        },
        addProcessedImage: (state, action: PayloadAction<ProcessedImage>) => {
            state.processedImages.unshift(action.payload);
        },
        setProcessing: (state, action: PayloadAction<boolean>) => {
            state.isProcessing = action.payload;
        },
        setCurrentOperation: (state, action: PayloadAction<string | null>) => {
            state.currentOperation = action.payload;
        },
        clearImages: (state) => {
            state.uploadedImages = [];
            state.processedImages = [];
        },
    },
});

export const {
    setUploadedImages,
    addProcessedImage,
    setProcessing,
    setCurrentOperation,
    clearImages,
} = imageSlice.actions;

export default imageSlice.reducer;
