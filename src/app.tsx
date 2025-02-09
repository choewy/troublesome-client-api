import { RouterProvider } from 'react-router-dom';

import { ROUTER } from './router';
import { appStore } from './store/app.store';

export default function App() {
  const { background } = appStore.useValue();

  return (
    <main
      id="main"
      style={{
        position: 'absolute',
        background,
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <RouterProvider router={ROUTER}></RouterProvider>
    </main>
  );
}
