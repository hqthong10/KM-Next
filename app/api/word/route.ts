import { NextResponse } from 'next/server';
import { reqGet } from '@/lib/request';

export async function GET(request: Request) {
    const res = await fetch('http://localhost:3020/w100', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await res.json();
    // const result = await reqGet('/w100', {}, {});
    return NextResponse.json(result);
}

export async function POST(request: Request) {
    try {
        const res = await request.json();
        // const res = await fetch('https://learn-nest-production.up.railway.app/w100', {})
        return NextResponse.json(res);
    } catch (e) {
        console.log('server error', e);
        return NextResponse.json({
            code: 500,
            elements: null
        });
    }
}
