import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { TITLE_IMAGE_PATH } from '@/persistaence/constants';
import { cookie } from '@/persistaence/cookie';

export const OutGameHeader = () => {
  const navigate = useNavigate();

  const handleLogOutButtonClick = useCallback(() => {
    cookie.removeTokens();

    navigate('/login', { replace: true });
  }, [navigate]);

  return (
    <nav
      style={{
        width: '100%',
        height: '70px',
        background: '#242836',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      ></div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            background: `url(${TITLE_IMAGE_PATH})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '150px',
            height: '55px',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <button>내정보</button>
        <button>설정</button>
        <button onClick={handleLogOutButtonClick}>로그아웃</button>
      </div>
    </nav>
  );
};
