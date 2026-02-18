import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: 'user' | 'admin';
    plan: 'free' | 'pro' | 'enterprise';
    creditsRemaining: number;
    apiKey: string;
    googleId?: string;
    image?: string;

    // Subscription Fields
    subscription: {
        id?: string; // Razorpay Subscription ID
        customerId?: string; // Razorpay Customer ID
        planId?: string; // Internal Plan ID (reference)
        status: 'active' | 'authenticated' | 'expired' | 'halted' | 'cancelled' | 'pending' | 'created';
        currentPeriodStart?: Date;
        currentPeriodEnd?: Date;
        nextBillingDate?: Date;
        razorpayPlanId?: string;
    };

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
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
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
            sparse: true, // Allows null/undefined to be unique (if generated later)
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true,
        },
        image: {
            type: String,
        },

        // Subscription Embedded Object
        subscription: {
            id: String,
            customerId: String,
            planId: { type: Schema.Types.ObjectId, ref: 'Plan' },
            status: {
                type: String,
                enum: ['active', 'authenticated', 'expired', 'halted', 'cancelled', 'pending', 'created'],
                default: 'created'
            },
            currentPeriodStart: Date,
            currentPeriodEnd: Date,
            nextBillingDate: Date,
            razorpayPlanId: String,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent model recompilation in development
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
