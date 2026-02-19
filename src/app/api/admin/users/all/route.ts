import { NextResponse } from 'next/server';
import { withAdmin, AuthenticatedRequest } from '@/lib/middleware';
import connectDB from '@/lib/db';
import User from '@/models/User';

async function handler(request: AuthenticatedRequest) {
    try {
        await connectDB();
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
        console.error('All users fetch error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export const GET = withAdmin(handler);
