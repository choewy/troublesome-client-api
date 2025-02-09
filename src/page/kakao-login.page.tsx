import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { BACKGROUND_IMAGE_PATH } from '@/persistaence/constants';
import { cookie } from '@/persistaence/cookie';
import { kakaoApiService } from '@/service/kakao-api.service';
import { appStore } from '@/store/app.store';

export function KakaoLoginPage() {
  appStore.useChangeBackground(BACKGROUND_IMAGE_PATH);

  const navigate = useNavigate();

  const loginWithKakao = useCallback(async () => {
    const code = new URLSearchParams(location.search).get('code');

    const { data, error } = await kakaoApiService.loginWithKakao(code);

    if (error) {
      // TODO 예외처리
      return console.log(error);
    }

    cookie.accessToken = data.accessToken;
    cookie.refreshToken = data.refreshToken;

    navigate('/', { replace: true });
  }, [navigate]);

  useEffect(() => {
    loginWithKakao();
  }, []);

  return <></>;
}
