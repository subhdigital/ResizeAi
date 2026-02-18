import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import GlobalConfig from '@/models/GlobalConfig';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

// Helper to check admin access
async function checkAdmin(request: NextRequest) {
    const token = getTokenFromRequest(request);
    if (!token) return false;

    const decoded = verifyToken(token);
    if (!decoded) return false;

    await connectDB();
    const user = await User.findById(decoded.userId);
    return user && user.role === 'admin';
}

export async function GET(request: NextRequest) {
    if (!await checkAdmin(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    try {
        const config = await GlobalConfig.findOne({ key: 'credit_settings' });
        return NextResponse.json(config || { error: 'Config not found' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    if (!await checkAdmin(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    try {
        const body = await request.json();
        const { anonymousDefaultCredits, registeredDefaultCredits, subscriptionCredits } = body;

        let config = await GlobalConfig.findOne({ key: 'credit_settings' });
        if (!config) {
            config = new GlobalConfig({ key: 'credit_settings' });
        }

        if (anonymousDefaultCredits !== undefined) config.anonymousDefaultCredits = anonymousDefaultCredits;
        if (registeredDefaultCredits !== undefined) config.registeredDefaultCredits = registeredDefaultCredits;
        if (subscriptionCredits !== undefined) config.subscriptionCredits = subscriptionCredits;

        await config.save();
        return NextResponse.json({ success: true, config });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
