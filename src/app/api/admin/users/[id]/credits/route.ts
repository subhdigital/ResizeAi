import { NextResponse } from 'next/server';
import { withAdmin, AuthenticatedRequest } from '@/lib/middleware';
import { adjustCredits } from '@/lib/credits';

async function handler(request: AuthenticatedRequest, { params }: { params: Promise<{ id: string }> }) {
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
            request.user!.userId, // Log actual admin ID
            reason
        );

        return NextResponse.json({ success: true, newBalance });
    } catch (error: any) {
        console.error('Adjust credits error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}

export const POST = withAdmin(handler as any);
