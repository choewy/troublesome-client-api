import { RouterProvider } from 'react-router-dom';

import { BACKGROUND_IMAGE_PATH } from './persistaence/constants';
import { ROUTER } from './router';

export default function App() {
  return (
    <main
      style={{
        position: 'absolute',
        background: `url(${BACKGROUND_IMAGE_PATH})`,
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <RouterProvider router={ROUTER}></RouterProvider>
    </main>
  );
}
