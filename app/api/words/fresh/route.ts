import { NextResponse } from 'next/server';
import { API_SERVER_HOST } from '@/utils/constant';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { PW100, FN100} = body;

        // Kiểm tra dữ liệu đầu vào
        if (!PW100 || !FN100) {
            return NextResponse.json({ error: 'Missing wordId or status' }, { status: 400 });
        }

        const res = await fetch(`${API_SERVER_HOST}/w100/fresh`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                PW100: PW100 || 0,
                FN100: FN100 || 0
            })
        });
        const result = await res.json();
        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.json({
            code: 500,
            error: 'Internal Server Error'
        });
    }
}