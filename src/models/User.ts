import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    plan: 'free' | 'pro' | 'enterprise';
    creditsRemaining: number;
    apiKey: string;
    subscriptionStatus: 'active' | 'inactive' | 'cancelled';
    subscriptionId?: string;
    googleId?: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            select: false,
        },
        plan: {
            type: String,
            enum: ['free', 'pro', 'enterprise'],
            default: 'free',
        },
        creditsRemaining: {
            type: Number,
            default: 10,
        },
        apiKey: {
            type: String,
            unique: true,
            required: true,
        },
        subscriptionStatus: {
            type: String,
            enum: ['active', 'inactive', 'cancelled'],
            default: 'active',
        },
        subscriptionId: {
            type: String,
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true,
        },
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent model recompilation in development
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
