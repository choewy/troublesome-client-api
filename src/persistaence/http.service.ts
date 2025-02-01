import axios, { AxiosInstance } from 'axios';

import { cookie } from './cookie';

export class HttpService {
  private readonly api: AxiosInstance;

  constructor(url: string, pathname?: string) {
    const baseURL = [url, pathname ?? ''].join('/');

    this.api = axios.create({ baseURL });
    this.api.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${cookie.accessToken}`;
      config.headers['x-refresh-token'] = cookie.refreshToken;

      return config;
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
