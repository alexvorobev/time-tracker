import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

import { getLocalStorageToken } from 'controllers/auth/utils/manageLocalStorage';

const headersList = <T = AxiosRequestHeaders>() =>
  ((): AxiosRequestConfig<T> => {
    const headers: AxiosRequestHeaders = {};

    const { accessToken } = getLocalStorageToken();

    if (accessToken && window.location.pathname !== '/login') {
      headers.authorization = `Bearer ${accessToken}`;
    }

    return { headers };
  })();

export interface ErrorResponse {
  response: {
    status: number;
    statusText: string;
  };
}

export interface SuccessResponse<T> {
  data?: T;
}

export const get = <ResponseType>(slug: string) =>
  axios.get<ResponseType>(`${process.env.REACT_APP_API_URL}${slug}`, headersList());

export const post = <PayloadType, ResponseType>(slug: string, data: unknown, onFinally?: () => void) =>
  axios.post<PayloadType, ResponseType>(`${process.env.REACT_APP_API_URL}${slug}`, data, headersList()).finally(() => {
    onFinally?.();
  });

export const update = <PayloadType>(slug: string, data: PayloadType) =>
  axios.patch(`${process.env.REACT_APP_API_URL}${slug}`, data, headersList<PayloadType>());

export const remove = (slug: string) => axios.delete(`${process.env.REACT_APP_API_URL}${slug}`, headersList());
