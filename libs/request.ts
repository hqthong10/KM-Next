import queryString from 'query-string';
import { API_SERVER_HOST } from '@/utils/constant';
import path from 'path';

interface IRequest {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
}

export const sendRequest = async <T>(props: IRequest) => {
    let { url, method, data, queryParams = {}, useCredentials = false, headers = {}, nextOption = {} } = props;
    // url = path.join(API_SERVER_HOST, url);

    const options: any = {
        method,
        headers: new Headers({ 'content-type': 'application/json', ...headers }),
        body: data ? JSON.stringify(data) : null,
        ...nextOption
    };
    
    if (useCredentials) options.credentials = 'include';

    if(queryParams) {
        url += `?${queryString.stringify(queryParams)}`;
    }

    return fetch(url, options).then(async (res) => {
        if(res.ok) {
            return res.json() as T;
        } else  {
            return res.json().then((json) => {
                return {
                    statusCode: res.status,
                    message: json?.message ?? '',
                    error: json?.error ?? ''
                }
                });
        }
    });
};
