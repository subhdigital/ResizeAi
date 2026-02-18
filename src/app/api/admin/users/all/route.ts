import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

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
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '20');
        const skip = (page - 1) * limit;

        const users = await User.find({})
            .select('name email plan creditsRemaining role subscription createdAt')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const mappedUsers = users.map(user => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            plan: user.plan,
            creditsRemaining: user.creditsRemaining,
            role: user.role,
            subscriptionStatus: user.subscription?.status || 'inactive',
            createdAt: user.createdAt
        }));

        const total = await User.countDocuments();

        return NextResponse.json({
            users: mappedUsers,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
