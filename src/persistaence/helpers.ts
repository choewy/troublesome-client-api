import { AxiosError, AxiosResponse } from 'axios';

export type ValueFromHttpReturnType<T> = {
  data: T | null;
  error: AxiosError | null;
};

export const valueFromHttp = async <T = any, D = any>(response: Promise<AxiosResponse<T, D>>) => {
  const result: ValueFromHttpReturnType<T> = {
    data: null,
    error: null,
  };

  try {
    result.data = (await response).data;
  } catch (e) {
    result.error = e as AxiosError;
  }

  return result;
};
