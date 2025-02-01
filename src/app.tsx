import { RouterProvider } from 'react-router-dom';

import { ROUTER } from './router';

export default function App() {
  return <RouterProvider router={ROUTER}></RouterProvider>;
}
