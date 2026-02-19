import { NextResponse } from 'next/server';
import { withAdmin, AuthenticatedRequest } from '@/lib/middleware';
import connectDB from '@/lib/db';
import GlobalConfig from '@/models/GlobalConfig';

async function getHandler(request: AuthenticatedRequest) {
    try {
        await connectDB();
        const config = await GlobalConfig.findOne({ key: 'credit_settings' });
        return NextResponse.json(config || { error: 'Config not found' });
    } catch (error) {
        console.error('Fetch global config error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

async function postHandler(request: AuthenticatedRequest) {
    try {
        const body = await request.json();
        const { anonymousDefaultCredits, registeredDefaultCredits, subscriptionCredits } = body;

        await connectDB();
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
        console.error('Update global config error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export const GET = withAdmin(getHandler);
export const POST = withAdmin(postHandler);
