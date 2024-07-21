import { instanceToPlain } from 'class-transformer';

export class AuthTokenPayload {
  id: number;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
  sub: string;

  constructor(id?: number) {
    if (id) {
      this.id = id;
    }
  }

  public static of(id: number) {
    return instanceToPlain(new AuthTokenPayload(id));
  }

  public static from(payload: unknown) {
    return Object.assign(new AuthTokenPayload(), payload as AuthTokenPayload);
  }
}
