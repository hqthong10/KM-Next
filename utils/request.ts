const _G = 'get';
const _P = 'post';
const _D = 'Delete';
const _PA = 'patch';
const _PU = 'put';

export const reqGet = (path: string, data: any) => callRequest(_G, path, data);
export const reqPost = (path: string, data: any) => callRequest(_P, path, data);
export const reqDelete = (path: string, data: any) => callRequest(_D, path, data);
export const reqPatch = (path: string, data: any) => callRequest(_PA, path, data);
export const reqPut = (path: string, data: any) => callRequest(_PU, path, data);

const callRequest = async (method: any, path: string, param: any) => {
    try {
        const parameter = { ...param };

        const rs: any = await fetch(path, {
            method,
            [[_P, _D, _PA, _PU].includes(method) ? 'body' : 'query']: parameter,
            headers: {
                'Content-Type': 'application/json',
                'cache-control': 'no-cache',
            }
        });
        console.log(rs)
        return rs;
    } catch (error: any) {
        return {
            code: 500,
            elements: null
        };
    }
};
