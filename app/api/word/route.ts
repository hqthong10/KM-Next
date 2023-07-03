import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const slug = params.slug;
    const res = await fetch('https://learn-nest-production.up.railway.app/w100', {});
  return NextResponse.json(res);
}

export async function POST(request: Request) {
    console.log('vao day n he');
    // const body = request.bodyUsed;
    // console.log('body', body)
    const res = await request.json();
    console.log('data ben trong', res);
  
    // const res = await fetch('https://learn-nest-production.up.railway.app/w100', {})
    return NextResponse.json(res);
}