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
    // Define plan IDs here or fetch from DB
    // These should ideally match plans in your production Razorpay Dashboard
    PRO: {
        id: 'plan_SHgrUiI8ULuAdV', // Generated automatically
        name: 'Pro',
        price: 499,
        currency: 'INR',
        description: '1000 Credits / Month',
    },
    ENTERPRISE: {
        id: 'plan_SHgrVB4zKwijqr', // Generated automatically
        name: 'Enterprise',
        price: 1999,
        currency: 'INR',
        description: '10000 Credits / Month',
    }
};
