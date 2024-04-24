import path from 'path';
import { getSession } from '@/lib/session';
const _G = 'GET';
const _P = 'POST';
const _D = 'DELETE';
const _PA = 'PATCH';
const _PU = 'PUT';
// const URL_SERVER = 'http://52.62.138.105:3000';
const URL_SERVER = 'http://129.168.1.62:10001';

export const reqGet = (path: string, data: any) => callRequest(_G, path, data);
export const reqPost = (path: string, data: any) => callRequest(_P, path, data);
export const reqDelete = (path: string, data: any) => callRequest(_D, path, data);
export const reqPatch = (path: string, data: any) => callRequest(_PA, path, data);
export const reqPut = (path: string, data: any) => callRequest(_PU, path, data);

const callRequest = async (method: any, route: string, param: any) => {
    try {
        const session = await getSession();
        const authorization = param.token ?? session?.user?.accessToken ?? 'nologin';
        const res = await fetch(path.join(URL_SERVER, route), {
            method,
            [[_P, _D, _PA, _PU].includes(method) ? 'body' : 'query']: JSON.stringify(param),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                authorization: `Bearer ${authorization}`
            }
        });
        return await res.json();
    } catch (error: any) {
        return {
            code: 500,
            elements: null
        };
    }
};
