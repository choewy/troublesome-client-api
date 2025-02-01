import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { kakaoApiService } from '@/service/kakao-api.service';

export function LoginPage() {
  const navigate = useNavigate();

  const handleKakaoLoginButton = useCallback(async () => {
    const { data, error } = await kakaoApiService.getKakaoLoginPageURI();

    if (error) {
      return console.log(error);
    }

    navigate(data.uri, { replace: true });
  }, [navigate]);

  return (
    <div>
      <h1>로그인</h1>
      <button onClick={handleKakaoLoginButton}>카카오 계정으로 로그인</button>
    </div>
  );
}
