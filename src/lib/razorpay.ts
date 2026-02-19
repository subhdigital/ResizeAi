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
        console.log('Razorpay Initialized with Key ID:', process.env.RAZORPAY_KEY_ID?.substring(0, 8) + '...');
    }
    return instance;
};

export const plans = {
    PRO: {
        id: process.env.RAZORPAY_PLAN_PRO || 'plan_SHgrUiI8ULuAdV',
        name: 'Pro',
        price: 499,
        currency: 'INR',
        description: '1000 Credits / Month',
    },
    ENTERPRISE: {
        id: process.env.RAZORPAY_PLAN_ENTERPRISE || 'plan_SHgrVB4zKwijqr',
        name: 'Enterprise',
        price: 1999,
        currency: 'INR',
        description: '10000 Credits / Month',
    }
};
