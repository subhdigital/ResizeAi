import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICompressionHistory extends Document {
    userId: mongoose.Types.ObjectId;
    originalSize: number;
    compressedSize: number;
    featureUsed: 'compress' | 'resize' | 'remove-background' | 'ai-optimize';
    originalFormat: string;
    outputFormat: string;
    creditsUsed: number;
    compressionRatio: number;
    createdAt: Date;
}

const CompressionHistorySchema: Schema<ICompressionHistory> = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        originalSize: {
            type: Number,
            required: true,
        },
        compressedSize: {
            type: Number,
            required: true,
        },
        featureUsed: {
            type: String,
            enum: ['compress', 'resize', 'remove-background', 'ai-optimize'],
            required: true,
        },
        originalFormat: {
            type: String,
            required: true,
        },
        outputFormat: {
            type: String,
            required: true,
        },
        creditsUsed: {
            type: Number,
            default: 1,
        },
        compressionRatio: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const CompressionHistory: Model<ICompressionHistory> =
    mongoose.models.CompressionHistory ||
    mongoose.model<ICompressionHistory>('CompressionHistory', CompressionHistorySchema);

export default CompressionHistory;
