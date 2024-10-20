import { RequestUserPartial } from './interfaces';

export class RequestUser<T extends RequestUserPartial> {
  id: number;
  name: string;
  email: string;

  constructor(user: T) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
