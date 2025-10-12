import { NextResponse } from 'next/server';
import { API_SERVER_HOST } from '@/utils/constant';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const res = await fetch(`${API_SERVER_HOST}/p100/${params.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await res.json();
    return NextResponse.json(result);
}
