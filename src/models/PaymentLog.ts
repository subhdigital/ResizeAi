import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPaymentLog extends Document {
    userId: mongoose.Types.ObjectId;
    subscriptionId?: string;
    paymentId?: string;
    orderId?: string;
    amount: number;
    currency: string;
    status: 'success' | 'failed' | 'pending' | 'refunded';
    eventType: string; // e.g., 'subscription.charged', 'payment.failed'
    failureReason?: string;
    metadata?: any;
}

const PaymentLogSchema: Schema<IPaymentLog> = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        subscriptionId: { type: String },
        paymentId: { type: String },
        orderId: { type: String },
        amount: { type: Number, required: true },
        currency: { type: String, default: 'INR' },
        status: {
            type: String,
            enum: ['success', 'failed', 'pending', 'refunded'],
            required: true
        },
        eventType: { type: String, required: true },
        failureReason: { type: String },
        metadata: { type: Schema.Types.Mixed },
    },
    { timestamps: true }
);

const PaymentLog: Model<IPaymentLog> = mongoose.models.PaymentLog || mongoose.model<IPaymentLog>('PaymentLog', PaymentLogSchema);

export default PaymentLog;
