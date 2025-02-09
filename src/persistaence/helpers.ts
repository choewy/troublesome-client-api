import { AxiosError, AxiosResponse } from 'axios';

import { DEVELOPMENT_CARD_LEVEL_IMAGE, DEVELOPMENT_CARD_IMAGE_PATH, NOBLE_CARD_IMAGE_PATH, TOKEN_IMAGE_PATH } from './constants';

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

export const getDevelopmentCardImagePath = (id: number) => `${DEVELOPMENT_CARD_IMAGE_PATH}/${id}.jpg`;
export const getDevelopmentCardLevelImagePath = (level: number) => `${DEVELOPMENT_CARD_LEVEL_IMAGE}/${level}.jpg`;
export const getNobleCardImagePath = (id: number) => `${NOBLE_CARD_IMAGE_PATH}/${id}.jpg`;
export const getTokenImagePath = (name: string) => `${TOKEN_IMAGE_PATH}/${name}.jpg`;
