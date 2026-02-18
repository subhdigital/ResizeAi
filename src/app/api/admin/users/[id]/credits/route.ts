import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';
import { adjustCredits } from '@/lib/credits';

async function checkAdmin(request: NextRequest) {
    const token = getTokenFromRequest(request);
    if (!token) return false;
    const decoded = verifyToken(token);
    if (!decoded) return false;
    await connectDB();
    const user = await User.findById(decoded.userId);
    return user && user.role === 'admin';
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!await checkAdmin(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    try {
        const { id } = await params;
        const body = await request.json();
        const { amount, reason } = body;

        if (amount === undefined || !reason) {
            return NextResponse.json({ error: 'Amount and reason are required' }, { status: 400 });
        }

        const newBalance = await adjustCredits(
            { userId: id },
            amount,
            'admin_action', // Placeholder for actual admin ID if we want to extract it
            reason
        );

        return NextResponse.json({ success: true, newBalance });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
