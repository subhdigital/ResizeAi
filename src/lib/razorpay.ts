import Razorpay from 'razorpay';

let instance: Razorpay;

export const razorpay = () => {
    if (!instance) {
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            throw new Error('Razorpay keys are missing in environment variables.');
        }
        instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    }
    return instance;
};

export const plans = {
    // Define plan IDs here or fetch from DB
    // These should ideally match plans in your production Razorpay Dashboard
    PRO: {
        id: 'plan_pro_monthly', // Replace with Actual Plan ID from Razorpay
        name: 'Pro',
        price: 499,
        currency: 'INR',
        description: '1000 Credits / Month',
    },
    ENTERPRISE: {
        id: 'plan_enterprise_monthly', // Replace
        name: 'Enterprise',
        price: 1999,
        currency: 'INR',
        description: '10000 Credits / Month',
    }
};
