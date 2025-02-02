import { createBrowserRouter, Navigate } from 'react-router-dom';

import { KakaoLoginPage } from './page/kakao-login.page';
import { LoginPage } from './page/login.page';
import { HomePage } from './page/home.page';
import { AuthGuard } from './guard/auth.guard';

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
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
