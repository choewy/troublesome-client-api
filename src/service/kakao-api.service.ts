import { config } from '@/persistaence/config';
import { valueFromHttp } from '@/persistaence/helpers';
import { HttpService } from '@/persistaence/http-service';
import { KakaoApiLoginPageURIRequestParam, KakaoApiLoginPageURIResponseType, KakaoApiLoginRequestBody, KakaoApiLoginResponseType } from '@/persistaence/types';

export class KakaoApiService {
  private readonly httpService = new HttpService(config.API_URL, 'api/kakao');

  private get kakaoLoginCallbackPageUri() {
    return `${config.APP_URL}/login/kakao`;
  }

  async getLoginPageURI() {
    return valueFromHttp(
      this.httpService.get<KakaoApiLoginPageURIResponseType>('login', {
        params: {
          redirectUri: this.kakaoLoginCallbackPageUri,
        } as KakaoApiLoginPageURIRequestParam,
      }),
    );
  }

  async loginWithKakao(code: string) {
    return valueFromHttp(
      this.httpService.post<KakaoApiLoginResponseType>('login', {
        redirectUri: this.kakaoLoginCallbackPageUri,
        code,
      } as KakaoApiLoginRequestBody),
    );
  }
}

export const kakaoApiService = new KakaoApiService();
