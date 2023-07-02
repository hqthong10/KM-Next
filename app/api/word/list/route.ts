import { NextResponse } from 'next/server'
 
export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const slug = params.slug;
    const res = await fetch('https://learn-nest-production.up.railway.app/w100', {});
  return NextResponse.json(res);
}