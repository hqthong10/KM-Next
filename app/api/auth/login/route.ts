import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession } from '@/lib/session';
import { API_SERVER_HOST } from '@/utils/constant';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        const res = await fetch(`${API_SERVER_HOST}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: body.email ?? '',
                password: body.password ?? ''
            })
        });
        const result = await res.json();
        if ((result?.data?.PN100 ?? 0) > 0) {
            // cookie
            const cookieStore = cookies();
            cookieStore.set('token', result?.data?.accessToken ?? '');
            cookieStore.set('refreshToken', result?.data?.refreshToken ?? '');

            // session
            const session = await getSession();
            session.user = result?.data ?? {};
            await session.save();
        }
        return NextResponse.json(result);
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            code: 500,
            elements: null
        });
    }
}
