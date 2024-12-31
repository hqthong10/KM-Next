import { NextResponse } from 'next/server';
import { API_SERVER_HOST } from '@/utils/constant';
import { sendRequest } from '@/libs/request';
import { auth } from '@/auth';
import { data } from 'autoprefixer';

export const revalidate = 60;

// get list words
export async function GET(request: Request) {
    const session = await auth();
    const user = session?.user as any;
    console.log(user);
    const res = await sendRequest({
        url: `${API_SERVER_HOST}/w100`,
        method: 'GET',
        data: {
            FN100: user?.FN100 || 0
        }
    });
    // const res2 = await fetch(`${API_SERVER_HOST}/w100`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // });
    // const result = await res.json();
    return NextResponse.json(res);
}

// add word
export async function POST(request: Request) {
    const body = await request.json();
    const { PW100, FN100, WV101, WV102, WA103, WV107, WV108, TOKEN } = body;

    const session = await auth();
    const user = session?.user as any;

    if (!PW100 || !FN100 || WV101 || WV102) {
        return NextResponse.json({ error: 'Missing wordId or status' }, { status: 400 });
    }

    const result = await sendRequest({
        method: 'POST',
        url: `${API_SERVER_HOST}/w100`,
        data: {
            PW100: PW100 ?? 0,
            WV101: WV101 ?? '', // word root
            WV102: WV102 ?? '', // word transtale
            WA103: WA103 ?? [], // type word
            WV107: WV107 ?? '', // word transtale
            WV108: WV108 ?? '', // word transtale
            FN100: FN100 ?? 0, // user create
            TOKEN: user?.accessToken || ''
        }
    });
    return NextResponse.json(result);
}
