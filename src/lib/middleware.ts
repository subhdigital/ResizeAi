import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenFromRequest } from './auth';
import connectDB from './db';
import User from '@/models/User';

export interface AuthenticatedRequest extends NextRequest {
    user?: {
        userId: string;
        email: string;
        plan: string;
    };
}

export function withAuth(
    handler: (req: AuthenticatedRequest) => Promise<NextResponse>,
    requireAuth = true
) {
    return async (req: NextRequest) => {
        const token = getTokenFromRequest(req);

        if (!token && requireAuth) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        if (token) {
            const payload = verifyToken(token);
            if (!payload && requireAuth) {
                return NextResponse.json(
                    { error: 'Invalid or expired token' },
                    { status: 401 }
                );
            }

            if (payload) {
                (req as AuthenticatedRequest).user = payload;
            }
        }

        try {
            return await handler(req as AuthenticatedRequest);
        } catch (error: any) {
            console.error('Middleware handler error:', error);
            return NextResponse.json(
                {
                    error: 'Internal server error',
                    message: error.message,
                    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
                },
                { status: 500 }
            );
        }
    };
}

export function withApiKey(
    handler: (req: NextRequest, user: any) => Promise<NextResponse>
) {
    return async (req: NextRequest) => {
        const apiKey = req.headers.get('authorization')?.replace('Bearer ', '');

        if (!apiKey) {
            return NextResponse.json(
                { error: 'API key required' },
                { status: 401 }
            );
        }

        await connectDB();
        const user = await User.findOne({ apiKey });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid API key' },
                { status: 401 }
            );
        }

        if (user.creditsRemaining <= 0) {
            return NextResponse.json(
                { error: 'Insufficient credits' },
                { status: 403 }
            );
        }

        return handler(req, user);
    };
}

// Rate limiting middleware
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(maxRequests = 10, windowMs = 60000) {
    return async (req: NextRequest, handler: () => Promise<NextResponse>) => {
        const ip = req.headers.get('x-forwarded-for') || 'unknown';
        const now = Date.now();
        const record = rateLimitMap.get(ip);

        if (record) {
            if (now < record.resetTime) {
                if (record.count >= maxRequests) {
                    return NextResponse.json(
                        { error: 'Too many requests' },
                        { status: 429 }
                    );
                }
                record.count++;
            } else {
                rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
            }
        } else {
            rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
        }

        return handler();
    };
}

export async function checkCredits(userId: string, creditsRequired = 1): Promise<boolean> {
    await connectDB();
    const user = await User.findById(userId);
    return !!(user && user.creditsRemaining >= creditsRequired);
}

export async function deductCredits(userId: string, credits = 1): Promise<void> {
    await connectDB();
    await User.findByIdAndUpdate(userId, {
        $inc: { creditsRemaining: -credits },
    });
}
