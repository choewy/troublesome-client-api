import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import { AuthGuard } from './guard/auth.guard';
import { GamePage } from './page/game.page';
import { HomePage } from './page/home.page';
import { KakaoLoginPage } from './page/kakao-login.page';
import { LobbyPage } from './page/lobby.page';
import { LoginPage } from './page/login.page';
import { PlayPage } from './page/play.page';

export const ROUTER = createBrowserRouter([
  {
    element: <AuthGuard />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/login/kakao',
        element: <KakaoLoginPage />,
      },
      {
        element: <Outlet />,
        children: [
          {
            path: '/lobby',
            element: <LobbyPage />,
          },
          {
            path: '/game',
            element: <GamePage />,
          },
          {
            path: '/play',
            element: <PlayPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
