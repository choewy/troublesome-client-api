import axios, { AxiosInstance } from 'axios';

import { cookie } from './cookie';
import { RequestHeader, ResponseHeader } from './enums';

export class HttpService {
  private readonly api: AxiosInstance;

  constructor(url: string, pathname?: string) {
    const baseURL = [url, pathname ?? ''].join('/');

    this.api = axios.create({ baseURL });
    this.api.interceptors.request.use((config) => {
      config.headers[RequestHeader.Authorization] = `Bearer ${cookie.accessToken}`;
      config.headers[RequestHeader.RefreshToken] = cookie.refreshToken;

      return config;
    });

    this.api.interceptors.response.use((response) => {
      const accessToken = response.headers[ResponseHeader.AccessToken];
      const refreshToken = response.headers[ResponseHeader.RefreshToken];

      if (accessToken && refreshToken) {
        cookie.accessToken = accessToken;
        cookie.refreshToken = refreshToken;
      }

      return response;
    });
  }

  public get get() {
    return this.api.get;
  }

  public get post() {
    return this.api.post;
  }

  public get patch() {
    return this.api.patch;
  }

  public get put() {
    return this.api.put;
  }

  public get delete() {
    return this.api.delete;
  }
}
