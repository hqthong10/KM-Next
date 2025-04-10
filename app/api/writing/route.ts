import { type NextRequest, NextResponse } from 'next/server';
import { API_SERVER_HOST } from '@/utils/constant';
import { sendRequest, IResponse } from '@/libs/request';
import { auth } from '@/auth';

export const revalidate = 60;

// get list words
export async function GET(request: NextRequest) {
    const session = await auth();
    const user = session?.user as any;

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')

    const res = await sendRequest<IResponse>({
        url: `${API_SERVER_HOST}/graphql`,
        method: 'POST',
        data: {
            query: query
        }
    });
    return NextResponse.json(res);
}

export async function POST(request: NextRequest) {
    const session = await auth();
    const user = session?.user as any;
    const body = await request.json();

    const PS100 = +body.PS100 || 0;
    const SV101 = body.SV101;
    const SV102 = body.SV102;

    const mutation = `
        mutation s100_create($PS100: Number, $SV101: String, $SV102: String) {
            s100_create(data: {
                PS100: $PS100,
                SV101: $SV101,
                SV102: $SV102,
            }){ PS100, SV101, SV102 }
        }
    `;

    const variables = {
        PS100,
        SV101,
        SV102
    };

    const res = await sendRequest<IResponse>({
        url: `${API_SERVER_HOST}/graphql`,
        method: 'POST',
        data: {
            // query: `
            //     mutation {
            //         s100_create(data: {
            //             PS100: ${PS100},
            //             SV101: ${SV101},
            //             SV102: ${SV102},
            //         }){ PS100, SV101, SV102 }
            //     }
            // `
            query: mutation,
            variables: variables
        }
    });
    return NextResponse.json(res);
}

export async function PUT(request: Request) {
    return NextResponse.json(1);
}

export async function PATCH(request: Request) {
    return NextResponse.json(1);
}

export async function DELETE(request: Request) {
    return NextResponse.json(1);
}

export async function HEAD(request: Request) {
    return NextResponse.json(1);
}