import NextAuth, { type DefaultSession} from "next-auth";
import { JWT } from "next-auth/jwt";

interface IUser {
    // user id mongo
    _id?: string;

    // user id hand
    PN100?: number;

    // username
    NV101?: string;

    // Email
    NV103?: string;

    // First Name
    NV106?: string;

    // Last Name
    NV107?: string;

    // Avatar
    NV108?: string;

    // Birthdate
    NV109?: string;

    // Language
    NV110?: string;

    // Gender
    NV111?: string;

    //
    accessToken?: string;

    //
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