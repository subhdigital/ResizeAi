import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGlobalConfig extends Document {
    key: string; // 'credit_settings'
    anonymousDefaultCredits: number;
    registeredDefaultCredits: number;
    subscriptionCredits: number; // Or a map for different tiers
    updatedBy?: string; // User ID of admin
}

const GlobalConfigSchema: Schema<IGlobalConfig> = new Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true,
            default: 'credit_settings',
        },
        anonymousDefaultCredits: {
            type: Number,
            default: 10,
        },
        registeredDefaultCredits: {
            type: Number,
            default: 10,
        },
        subscriptionCredits: {
            type: Number,
            default: 100,
        },
        updatedBy: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const GlobalConfig: Model<IGlobalConfig> = mongoose.models.GlobalConfig || mongoose.model<IGlobalConfig>('GlobalConfig', GlobalConfigSchema);

export default GlobalConfig;
