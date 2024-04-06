import path from 'path';
const _G = 'GET';
const _P = 'POST';
const _D = 'DELETE';
const _PA = 'PATCH';
const _PU = 'PUT';

export const reqGet = (path: string, data: any) => callRequest(_G, path, data);
export const reqPost = (path: string, data: any) => callRequest(_P, path, data);
export const reqDelete = (path: string, data: any) => callRequest(_D, path, data);
export const reqPatch = (path: string, data: any) => callRequest(_PA, path, data);
export const reqPut = (path: string, data: any) => callRequest(_PU, path, data);

const callRequest = async (method: any, path: string, param: any) => {
    try {
        const res = await fetch(path, {
            method,
            [[_P, _D, _PA, _PU].includes(method) ? 'body' : 'query']: JSON.stringify(param),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });
        const { data } = await res.json();
        return data;
    } catch (error: any) {
        return {
            code: 500,
            elements: null
        };
    }
};
