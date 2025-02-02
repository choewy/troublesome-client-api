import { config } from '@/persistaence/config';
import { valueFromHttp } from '@/persistaence/helpers';
import { HttpService } from '@/persistaence/http-service';

export class GameApiService {
  private readonly httpService = new HttpService(config.API_URL, 'games');

  async list() {
    return valueFromHttp(this.httpService.get(''));
  }
}

export const gameApiService = new GameApiService();
