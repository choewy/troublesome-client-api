import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { cookie } from '@/persistaence/cookie';
import { kakaoApiService } from '@/service/kakao-api.service';

export function KakaoLoginPage() {
  const navigate = useNavigate();

  const loginWithKakao = useCallback(async () => {
    const code = new URLSearchParams(location.search).get('code');

    const { data, error } = await kakaoApiService.loginWithKakao(code);

    if (error) {
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
