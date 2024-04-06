import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/lib/session';

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('token')?.value;

    if (currentUser && request.nextUrl.pathname.startsWith('/login')) {
        return Response.redirect(new URL('/', request.url));
    }

    if (!currentUser && request.nextUrl.pathname.startsWith('/admin')) {
        return Response.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
