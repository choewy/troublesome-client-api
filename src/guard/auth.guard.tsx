import { useCallback, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { InGameHeader } from '@/component/in-game.header';
import { OutGameHeader } from '@/component/out-game.header';
import { cookie } from '@/persistaence/cookie';
import { authApiService } from '@/service/auth-api.service';
import { authStore } from '@/store/auth.store';

export function AuthGuard() {
  const location = useLocation();
  const navigate = useNavigate();

  const [authState, setAuthState] = authStore.useState();

  const checkAuth = useCallback(async () => {
    const hasJwt = !!cookie.accessToken && !!cookie.refreshToken;

    if (!hasJwt) {
      setAuthState({ ok: false, auth: null });

      if (!location.pathname.startsWith('/login')) {
        navigate('/login', { replace: true });
      }

      return;
    }

    const { error, data } = await authApiService.auth();

    if (error) {
      setAuthState({ ok: false, auth: null });

      if (!location.pathname.startsWith('/login')) {
        navigate('/login', { replace: true });
      }

      return;
    }

    setAuthState({ ok: true, auth: data });

    if (location.pathname.startsWith('/login')) {
      navigate('/', { replace: true });
    }
  }, [location, navigate, setAuthState]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (authState.ok === null) {
    return <></>;
  }

  return (
    <>
      {authState.ok && authState.auth.gameId && <InGameHeader />}
      {authState.ok && !authState.auth?.gameId && <OutGameHeader />}
      <Outlet />
    </>
  );
}
