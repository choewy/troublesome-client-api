import Cookies from 'universal-cookie';

export class Cookie extends Cookies {
  public get accessToken(): string | null {
    return this.get('access_token') ?? null;
  }

  public set accessToken(accessToken: string) {
    this.set('access_token', accessToken);
  }

  public get refreshToken(): string | null {
    return this.get('refresh_token') ?? null;
  }

  public set refreshToken(refreshToken: string) {
    this.set('refresh_token', refreshToken);
  }

  public removeTokens() {
    this.remove('access_token');
    this.remove('refresh_token');
  }
}

export const cookie = new Cookie();
