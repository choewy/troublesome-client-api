import { useCallback } from 'react';

import { BACKGROUND_IMAGE_PATH, KAKAO_LOGIN_BUTTON_IMAGE_PATH, TITLE_IMAGE_PATH } from '@/persistaence/constants';
import { kakaoApiService } from '@/service/kakao-api.service';
import { appStore } from '@/store/app.store';

export function LoginPage() {
  appStore.useChangeBackground(BACKGROUND_IMAGE_PATH);

  const handleKakaoLoginButtonClick = useCallback(async () => {
    const { data, error } = await kakaoApiService.getLoginPageURI();

    if (error) {
      return console.log(error);
    }

    window.location.href = data.uri;
  }, [location]);

  return (
    <div
      style={{
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: `url(${TITLE_IMAGE_PATH})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '600px',
          height: '220px',
          marginBottom: '40px',
        }}
      />
      <div
        style={{
          background: `url(${KAKAO_LOGIN_BUTTON_IMAGE_PATH})`,
          backgroundPosition: 'center',
          width: '300px',
          height: '40px',
          cursor: 'pointer',
        }}
        onClick={handleKakaoLoginButtonClick}
      />
    </div>
  );
}
