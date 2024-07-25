import path from 'path';
const _G = 'GET';
const _P = 'POST';
const _D = 'DELETE';
const _PA = 'PATCH';
const _PU = 'PUT';
const URL_SERVER = 'http://localhost:3020';

export const reqGet = (path: string, data: any, headers?: any) => callRequest(_G, path, data, headers);
export const reqPost = (path: string, data: any, headers?: any) => callRequest(_P, path, data, headers);
export const reqDelete = (path: string, data: any, headers?: any) => callRequest(_D, path, data, headers);
export const reqPatch = (path: string, data: any, headers?: any) => callRequest(_PA, path, data, headers);
export const reqPut = (path: string, data: any, headers?: any) => callRequest(_PU, path, data, headers);

const callRequest = async (method: any, route: string, param: any, heads?: any) => {
    try {
        const res = await fetch(path.join(URL_SERVER, route), {
            method,
            [[_P, _D, _PA, _PU].includes(method) ? 'body' : 'query']: JSON.stringify(param),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                // authorization: `Bearer ${authorization}`
                
            }
        });
        return await res.json();
    } catch (error: any) {
        return {
            code: 420,
            elements: null
        };
    }
};
