import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
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
        return NextResponse.json(result);
    } catch (e) {
        console.error('catch', e);
        return NextResponse.json({
            statusCode: 500
        });
    }
}
