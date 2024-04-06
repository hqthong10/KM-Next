import { getIronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
    user?: any;
    isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
    isLoggedIn: false
};

export const sessionOptions: SessionOptions = {
    // You need to create a secret key at least 32 characters long.
    password: process.env.SESSION_SECRET!,
    cookieName: 'learn-session',
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    }
};

export async function getSession() {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }
    return session;
}

export async function setSession(user: any) {
    const session = await getSession();
    session.user = user;
    session.isLoggedIn = (user?.FN100 ?? 0) > 0;
    return await session.save();
}
