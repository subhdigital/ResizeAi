import connectDB from '@/lib/db';
import User, { IUser } from '@/models/User';
import AnonymousUser, { IAnonymousUser } from '@/models/AnonymousUser';
import CreditTransaction from '@/models/CreditTransaction';
import GlobalConfig from '@/models/GlobalConfig';
import { NextRequest } from 'next/server';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

const COOKIE_NAME = 'device_id';

/**
 * Get or initialize global configuration
 */
export async function getConfig() {
    await connectDB();
    let config = await GlobalConfig.findOne({ key: 'credit_settings' });
    if (!config) {
        config = await GlobalConfig.create({
            key: 'credit_settings',
            anonymousDefaultCredits: 5,
            registeredDefaultCredits: 10,
            subscriptionCredits: 100,
        });
    }
    return config;
}

/**
 * Initialize or get an anonymous user based on device ID
 */
export async function getOrInitAnonymousUser(deviceId: string, fingerprint?: string): Promise<IAnonymousUser> {
    await connectDB();

    let anonUser = await AnonymousUser.findOne({ deviceId });

    if (!anonUser && fingerprint) {
        // Fallback: Check if fingerprint exists (Anti-abuse)
        anonUser = await AnonymousUser.findOne({ fingerprint });
    }

    if (!anonUser) {
        const config = await getConfig();
        anonUser = await AnonymousUser.create({
            deviceId,
            creditsRemaining: config.anonymousDefaultCredits,
            fingerprint,
        });
    } else {
        // Update last active
        anonUser.lastActive = new Date();
        // If we found by fingerprint but deviceId was different (e.g. cleared cookies), 
        // we might want to update the deviceId or keep the old one. 
        // For simplicity, we keep the original record and return it.
        // The calling API should probably update the client's cookie to match this record's deviceId.
        await anonUser.save();
    }

    return anonUser;
}

/**
 * Get credits for a user (either authenticated or anonymous)
 */
export async function getCredits(identifier: { userId?: string; deviceId?: string }) {
    await connectDB();

    if (identifier.userId) {
        const user = await User.findById(identifier.userId);
        return user ? user.creditsRemaining : 0;
    } else if (identifier.deviceId) {
        const anonUser = await AnonymousUser.findOne({ deviceId: identifier.deviceId });
        return anonUser ? anonUser.creditsRemaining : 0;
    }
    return 0;
}

/**
 * Deduct credits from a user
 */
export async function deductCredits(
    identifier: { userId?: string; deviceId?: string },
    amount: number = 1,
    action: string,
    metadata?: any
): Promise<{ success: boolean; remaining: number; error?: string }> {
    await connectDB();

    let currentCredits = 0;
    let updateTarget: any = null;
    let isAnonymous = false;

    if (identifier.userId) {
        updateTarget = await User.findById(identifier.userId);
        if (!updateTarget) return { success: false, remaining: 0, error: 'User not found' };
        currentCredits = updateTarget.creditsRemaining;
    } else if (identifier.deviceId) {
        isAnonymous = true;
        updateTarget = await AnonymousUser.findOne({ deviceId: identifier.deviceId });
        if (!updateTarget) return { success: false, remaining: 0, error: 'Anonymous user not found' };
        currentCredits = updateTarget.creditsRemaining;
    } else {
        return { success: false, remaining: 0, error: 'No identifier provided' };
    }

    if (currentCredits < amount) {
        return { success: false, remaining: currentCredits, error: 'Insufficient credits' };
    }

    // Deduct
    updateTarget.creditsRemaining -= amount;
    await updateTarget.save();

    // Log transaction
    await CreditTransaction.create({
        userId: identifier.userId,
        anonymousId: isAnonymous ? identifier.deviceId : undefined,
        amount: -amount,
        action,
        metadata,
    });

    return { success: true, remaining: updateTarget.creditsRemaining };
}

/**
 * Admin: Add/Remove credits
 */
export async function adjustCredits(
    identifier: { userId?: string; deviceId?: string },
    amount: number, // Positive to add, negative to remove (admin override)
    adminId: string,
    reason: string
) {
    await connectDB();

    let updateTarget: any = null;
    let isAnonymous = false;

    if (identifier.userId) {
        updateTarget = await User.findById(identifier.userId);
    } else if (identifier.deviceId) {
        isAnonymous = true;
        updateTarget = await AnonymousUser.findOne({ deviceId: identifier.deviceId });
    }

    if (!updateTarget) {
        throw new Error('User not found');
    }

    updateTarget.creditsRemaining += amount;
    await updateTarget.save();

    await CreditTransaction.create({
        userId: identifier.userId,
        anonymousId: isAnonymous ? identifier.deviceId : undefined,
        amount,
        action: 'admin_adjustment',
        metadata: { adminId, reason },
    });

    return updateTarget.creditsRemaining;
}

/**
 * Middleware helper to check and deduct credits for API routes
 */
export async function checkAndDeductCredits(request: NextRequest, action: string) {
    await connectDB();

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

    if (!userId) {
        if (!deviceId) {
            // If no cookie, we can't really track them unless we set one, which is hard in a pure function returning a boolean/struct.
            // But usually the middleware or frontend ensures the cookie exists.
            return { success: false, error: 'Session not initialized. Please refresh.' };
        }
        // Ensure anonymous record exists, potentially linking via fingerprint
        await getOrInitAnonymousUser(deviceId, fingerprint);
    }

    // Determine cost
    // Requirement: Anonymous users = 2 credits per usage
    // Authenticated users = 1 credit (or kept as is)
    const cost = userId ? 1 : 2;

    return await deductCredits({ userId, deviceId }, cost, action);
}
