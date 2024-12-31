import { NextResponse } from 'next/server';
import { API_SERVER_HOST } from '@/utils/constant';

export async function POST(request: Request) {
    try {
        // const res = await request.json();
        // const res = await fetch('https://learn-nest-production.up.railway.app/w100', {})
        return NextResponse.json({
            data: 1
        });
    } catch (e) {
        console.log('server error', e);
        return NextResponse.json({
            code: 500,
            elements: null
        });
    }
}
