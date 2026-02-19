const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

async function createAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Simple User Schema for script
        const UserSchema = new mongoose.Schema({
            name: String,
            email: String,
            password: { type: String, select: false },
            role: { type: String, default: 'user' },
            creditsRemaining: { type: Number, default: 0 },
            plan: { type: String, default: 'free' }
        });

        const User = mongoose.models.User || mongoose.model('User', UserSchema);

        const email = 'admin@imagetools.com';
        const password = 'adminpassword123'; // In a real scenario, use an env variable

        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            console.log('Admin already exists');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await User.create({
            name: 'Admin User',
            email: email,
            password: hashedPassword,
            role: 'admin',
            plan: 'enterprise',
            creditsRemaining: 999999
        });

        console.log('Admin user created successfully!');
        console.log('Email:', email);
        console.log('Password:', password);
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
}

createAdmin();
