import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

import { getLocalStorageToken } from 'controllers/auth/utils/manageLocalStorage';

const headersList = (): AxiosRequestConfig<AxiosRequestHeaders> => {
  const headers: AxiosRequestHeaders = {};

  const { accessToken } = getLocalStorageToken();

  if (accessToken && window.location.pathname !== '/login') {
    headers.authorization = `Bearer ${accessToken}`;
  }

  return { headers };
};

console.log(headersList());

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

export interface SuccessResponse<T> {
  data?: T;
}

export const get = <ResponseType>(slug: string) =>
  axios
    .get<ResponseType>(`${process.env.REACT_APP_API_URL}${slug}`, headersList())
    .then((response) => response)
    .catch((error) => {
      console.error(error);
    });

export const post = <PayloadType, ResponseType>(slug: string, data: unknown, onFinally?: () => void) =>
  axios
    .post<PayloadType, ResponseType>(`${process.env.REACT_APP_API_URL}${slug}`, data, headersList())
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      onFinally?.();
    });

export const update = <PayloadType>(slug: string, data: PayloadType) =>
  axios
    .patch(`${process.env.REACT_APP_API_URL}${slug}`, data)
    .then((response) => response)
    .catch((error) => {
      console.error(error);
    });

export const remove = (slug: string) =>
  axios
    .delete(`${process.env.REACT_APP_API_URL}${slug}`, headersList())
    .then((response) => response)
    .catch((error) => {
      console.error(error);
    });
