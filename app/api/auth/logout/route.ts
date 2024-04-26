import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession } from '@/lib/session';

export async function POST(request: Request) {
    try {
        // cookie
        const cookieStore = cookies();
        cookieStore.delete('token');
        cookieStore.delete('refreshToken');

        // session
        const session = await getSession();
        session.user = null;
        await session.save();

        return NextResponse.json({
            data: 1
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            code: 500,
            elements: null
        });
    }
}
