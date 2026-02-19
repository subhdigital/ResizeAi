const Razorpay = require('razorpay');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error('Error: RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set in .env.local');
    process.exit(1);
}

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createPlans = async () => {
    try {
        console.log('Creating Pro Plan...');
        const proPlan = await razorpay.plans.create({
            period: 'monthly',
            interval: 1,
            item: {
                name: 'Pro Plan',
                amount: 49900,
                currency: 'INR',
                description: '1000 Credits per month'
            }
        });
        const proId = proPlan.id;
        console.log('✅ Pro Plan Created! ID:', proId);

        console.log('Creating Enterprise Plan...');
        const enterprisePlan = await razorpay.plans.create({
            period: 'monthly',
            interval: 1,
            item: {
                name: 'Enterprise Plan',
                amount: 199900,
                currency: 'INR',
                description: '10000 Credits per month'
            }
        });
        const entId = enterprisePlan.id;
        console.log('✅ Enterprise Plan Created! ID:', entId);

        fs.writeFileSync('plan-ids.txt', `PRO_ID=${proId}\nENTERPRISE_ID=${entId}`);
        console.log('Saved Plan IDs to plan-ids.txt');

    } catch (error) {
        console.error('Error creating plans:', error);
    }
};

createPlans();
