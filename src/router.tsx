import { createBrowserRouter } from 'react-router-dom';

import { KakaoLoginPage } from './page/kakao-login.page';
import { LoginPage } from './page/login.page';

export const ROUTER = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/login/kakao',
    element: <KakaoLoginPage />,
  },
  {
    path: '/oauth',
    element: <LoginPage />,
  },
]);
