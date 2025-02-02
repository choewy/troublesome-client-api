import { config } from '@/persistaence/config';
import { valueFromHttp } from '@/persistaence/helpers';
import { HttpService } from '@/persistaence/http-service';
import { AuthApiResponseType } from '@/persistaence/types';

export class AuthApiService {
  private readonly httpService = new HttpService(config.API_URL, 'auth');

  async auth() {
    return valueFromHttp(this.httpService.get<AuthApiResponseType>(''));
  }
}

export const authApiService = new AuthApiService();
