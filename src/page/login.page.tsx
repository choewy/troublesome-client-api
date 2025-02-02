import { useCallback } from 'react';

import { kakaoApiService } from '@/service/kakao-api.service';

export function LoginPage() {
  const handleKakaoLoginButton = useCallback(async () => {
    const { data, error } = await kakaoApiService.getLoginPageURI();

    if (error) {
      return console.log(error);
    }

    window.location.href = data.uri;
  }, [location]);

  return (
    <div>
      <h1>로그인</h1>
      <button onClick={handleKakaoLoginButton}>카카오 계정으로 로그인</button>
    </div>
  );
}
