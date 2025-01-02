import queryString from 'query-string';
import { auth } from "@/auth";
import { useSession } from "next-auth/react";
import { IUser } from '@/types/next-auth';

export interface IRequest {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
}

export interface IResponse {
    statusCode: number;
    message?: string;
    error?: string;
    data?: any;
}

export const sendRequest = async <T>(props: IRequest) => {
    let { url, method, data, useCredentials = false, headers = {}, nextOption = {} } = props;
    let accessToken = '';

    if(typeof window == "undefined") {
        // server
        const session = await auth();
        accessToken = (session?.user as IUser).accessToken || '';
    } else {
        // client
        const { data: session } = useSession();
        accessToken = (session?.user as IUser).accessToken || '';
    }

    const options: any = {
        method,
        headers: new Headers({
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            ...headers
        }),
        body: data ? JSON.stringify(data) : null,
        ...nextOption
    };

    if(method.toUpperCase() === 'GET') {
        delete options.body;
        url += `?${queryString.stringify(data || {})}`;
    }

    if (useCredentials) options.credentials = 'include';

    return fetch(url, options).then(async (res) => {
        if (res.ok) {
            return res.json() as T;
        } else {
            return res.json().then((json) => {
                return {
                    statusCode: res.status,
                    message: json?.message ?? '',
                    error: json?.error ?? ''
                };
            });
        }
    });
};
