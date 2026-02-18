import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPlan extends Document {
    name: string;
    description?: string;
    interval: 'monthly' | 'yearly';
    price: number;
    credits: number;
    razorpayPlanId: string; // The ID from Razorpay Dashboard
    active: boolean;
    features: string[];
}

const PlanSchema: Schema<IPlan> = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        interval: { type: String, enum: ['monthly', 'yearly'], required: true },
        price: { type: Number, required: true },
        credits: { type: Number, required: true },
        razorpayPlanId: { type: String, required: true, unique: true },
        active: { type: Boolean, default: true },
        features: [{ type: String }],
    },
    { timestamps: true }
);

const Plan: Model<IPlan> = mongoose.models.Plan || mongoose.model<IPlan>('Plan', PlanSchema);

export default Plan;
