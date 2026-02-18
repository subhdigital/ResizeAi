import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAnonymousUser extends Document {
    deviceId: string;
    creditsRemaining: number;
    fingerprint?: string;
    lastActive: Date;
    createdAt: Date;
    updatedAt: Date;
}

const AnonymousUserSchema: Schema<IAnonymousUser> = new Schema(
    {
        deviceId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        creditsRemaining: {
            type: Number,
            default: 5, // Default, but should be set from config on creation
        },
        fingerprint: {
            type: String,
            index: true, // Helpful for finding duplicates/abuse
        },
        lastActive: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent model recompilation in development
const AnonymousUser: Model<IAnonymousUser> = mongoose.models.AnonymousUser || mongoose.model<IAnonymousUser>('AnonymousUser', AnonymousUserSchema);

export default AnonymousUser;
