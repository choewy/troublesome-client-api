import { BACKGROUND_IMAGE_PATH } from '@/persistaence/constants';
import { appStore } from '@/store/app.store';

export function HomePage() {
  appStore.useChangeBackground(BACKGROUND_IMAGE_PATH);

  return <div>Home</div>;
}
