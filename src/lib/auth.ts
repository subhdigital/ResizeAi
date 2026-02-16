import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface JWTPayload {
    userId: string;
    email: string;
    plan: string;
}

export const generateToken = (payload: JWTPayload): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): JWTPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
        return null;
    }
};

export const getTokenFromRequest = (request: NextRequest): string | null => {
    // First try to get from cookie
    const tokenFromCookie = request.cookies.get('token')?.value;
    if (tokenFromCookie) {
        return tokenFromCookie;
    }

    // Fallback to Authorization header for API requests
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }

    return null;
};

export const generateApiKey = (): string => {
    const randomString = Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    return `aio_${randomString}`;
};
