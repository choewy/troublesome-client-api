import Cookies from 'universal-cookie';

import { CookieKey } from './enums';

export class Cookie extends Cookies {
  public get accessToken(): string | null {
    return this.get(CookieKey.AccessToken) ?? null;
  }

  public set accessToken(accessToken: string) {
    this.set(CookieKey.AccessToken, accessToken, { path: '/' });
  }

  public get refreshToken(): string | null {
    return this.get(CookieKey.RefreshToken) ?? null;
  }

  public set refreshToken(refreshToken: string) {
    this.set(CookieKey.RefreshToken, refreshToken, { path: '/' });
  }

  public removeTokens() {
    this.remove(CookieKey.AccessToken);
    this.remove(CookieKey.RefreshToken);
  }
}

export const cookie = new Cookie();
