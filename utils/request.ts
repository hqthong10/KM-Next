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
            [[_P, _D, _PA, _PU].includes(method) ? 'body' : 'query']: param,
            headers: {
                'Content-Type': 'application/json',
                // 'cache-control': 'no-cache'
            }
        });
        const { data } = await res.json();
        return data;
    } catch (error: any) {
        console.log('error ne')
        return {
            code: 500,
            elements: null
        };
    }
};
