import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICreditTransaction extends Document {
    userId?: string; // Reference to User ID
    anonymousId?: string; // Reference to AnonymousUser Device ID
    amount: number; // Negative for usage, positive for refill
    action: string; // e.g., 'resize', 'remove-bg', 'admin-adjustment'
    metadata?: any; // Additional info
    ipAddress?: string;
    userAgent?: string;
    createdAt: Date;
}

const CreditTransactionSchema: Schema<ICreditTransaction> = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            sparse: true,
        },
        anonymousId: {
            type: String, // Storing deviceId
            sparse: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        action: {
            type: String,
            required: true,
        },
        metadata: {
            type: Schema.Types.Mixed,
        },
        ipAddress: String,
        userAgent: String,
    },
    {
        timestamps: { createdAt: true, updatedAt: false }, // Only need createdAt for audit logs
    }
);

// Index for fast innovative queries
CreditTransactionSchema.index({ userId: 1, createdAt: -1 });
CreditTransactionSchema.index({ anonymousId: 1, createdAt: -1 });

const CreditTransaction: Model<ICreditTransaction> = mongoose.models.CreditTransaction || mongoose.model<ICreditTransaction>('CreditTransaction', CreditTransactionSchema);

export default CreditTransaction;
