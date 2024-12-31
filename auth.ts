import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { IUser } from './types/next-auth';
import { API_SERVER_HOST } from '@/utils/constant';
import { InvalidEmailPasswordError } from './utils/error';
import { sendRequest } from './libs/request';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                let user = null;

                const result = await sendRequest<any>({  
                    url: `http://localhost:3040/api/auth/login`,
                    method: 'POST',
                    data: {
                        email: credentials.email,
                        password: credentials.password
                    }
                });

                user = result?.data || null;

                if (!!user && result?.statusCode === 200) {
                    return user;
                }
                throw new InvalidEmailPasswordError();

            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.user = user as IUser;
            }
            return token;
        },
        session({ session, token }) {
            (session.user as IUser) = token.user;
            return session;
        },
        authorized: async ({ auth }) => {
            return !!auth;
        }
    }
});
