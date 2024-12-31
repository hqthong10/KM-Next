import NextAuth, { type DefaultSession} from "next-auth";
import { JWT } from "next-auth/jwt";

interface IUser {
    _id?: string;
    PN100?: number;
    NV101?: string;
    NV103?: string;
    NV106?: string;
    NV107?: string;
    NV108?: string;
    NV109?: string;
    NV110?: string;
    NV111?: string;
    accessToken?: string;
    refreshToken?: string;
}

declare module "next-auth" {
    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    interface User extends IUser {}
    /**
     * The shape of the account object returned in the OAuth providers' `account` callback,
     * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
     */
    interface Account {}
   
    /**
     * Returned by `useSession`, `auth`, contains information about the active session.
     */
    interface Session {}
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
        refreshToken: string;
        user: IUser;
        accessExpire: number;
        error: string;
    }
}