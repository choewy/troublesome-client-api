import { RequestUserPartial } from '@/core/context';

export class RequestUserLog {
  id: number;
  name: string;
  email: string;

  constructor(user: RequestUserPartial) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
