import Cookies from 'js-cookie';
import axios from 'axios';
import { GEMINI_API, USER_API } from '../../constant/endpoint';

const baseURL: string = import.meta.env.VITE_BACKEND_API_URL as string;
type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface Params {
    [key: string]: string | number | undefined;
}

const api = async (
    endpoint: string,
    method: HttpMethod,
    body?: any,
    params: Params = {}
) => {
    const token = Cookies.get('Authorization');
    const isFormData = body instanceof FormData;

    const url = endpoint.replace(/:\w+/g, (match) => {
        const key = match.slice(1);
        return params[key]?.toString() || match;
    });

    const headers: Record<string, string> = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(isFormData
            ? { 'Content-Type': 'multipart/form-data' }
            : { 'Content-Type': 'application/json' }),
    };

    try {
        const config = {
            method,
            url: `${baseURL}${url}`,
            headers,
            data: body,
            params,
        };

        const response = await axios(config);
        return response;
    } catch (error: any) {
        console.error(error);
        throw error.response?.data || error.message;
    }
};

export const API = {
    chatGemini: (body: any) => api(GEMINI_API.chatGemini, 'post', body),
    createWaitlist: (body: any) => api(USER_API.createWaitlist, 'post', body),
};
