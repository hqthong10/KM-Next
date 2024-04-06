import { NextResponse } from 'next/server';
// const _HOST_NAME = 'http://52.62.138.105:3000';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const slug = params.slug;
    const res = await fetch('http://52.62.138.105:3000/w100', {});
    return NextResponse.json(res);
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
