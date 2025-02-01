import { config } from '@/persistaence/config';
import { valueFromHttp } from '@/persistaence/helpers';
import { HttpService } from '@/persistaence/http.service';

export class KakaoApiService {
  private readonly httpService = new HttpService(config.API_URL, 'api/kakao');

  private get kakaoLoginCallbackPageUri() {
    return `${config.APP_URL}/login/kakao`;
  }

  async getLoginPageURI() {
    return valueFromHttp(this.httpService.get('login', { params: { redirectUri: this.kakaoLoginCallbackPageUri } }));
  }

  async loginWithKakao(code: string) {
    return valueFromHttp(this.httpService.post('login', { redirectUri: this.kakaoLoginCallbackPageUri, code }));
  }
}

export const kakaoApiService = new KakaoApiService();
