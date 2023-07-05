import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
	const slug = params.slug;
	const res = await fetch('https://learn-nest-production.up.railway.app/w100', {});
	return NextResponse.json(res);
}

export async function POST(request: Request) {
	console.log('222');
	try {
		const res = await request.json();
		console.log('body', res)
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