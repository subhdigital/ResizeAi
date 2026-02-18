import { NextRequest, NextResponse } from 'next/server';
import { getCredits, getOrInitAnonymousUser } from '@/lib/credits';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

const COOKIE_NAME = 'device_id';

export async function GET(request: NextRequest) {
    try {
        let userId: string | undefined;
        let deviceId = request.cookies.get(COOKIE_NAME)?.value;
        const token = getTokenFromRequest(request);
        const fingerprint = request.headers.get('x-device-fingerprint') || undefined;

        if (token) {
            const decoded = verifyToken(token);
            if (decoded) {
                userId = decoded.userId;
            }
        }

        // Initialize Anonymous User if no valid user session or if existing anonymous device
        if (!userId) {
            if (!deviceId) {
                deviceId = crypto.randomUUID();
            }
            // Pass fingerprint to link/create anonymous user
            await getOrInitAnonymousUser(deviceId, fingerprint);
        }

        const credits = await getCredits({ userId, deviceId });

        const response = NextResponse.json({
            credits,
            isAnonymous: !userId,
            deviceId: !userId ? deviceId : undefined,
        });

        // Set device cookie if it was new and user is anonymous
        if (!userId && deviceId && !request.cookies.get(COOKIE_NAME)) {
            response.cookies.set({
                name: COOKIE_NAME,
                value: deviceId,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 365, // 1 year
                path: '/',
            });
        }

        return response;
    } catch (error) {
        console.error('Error fetching credits:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
