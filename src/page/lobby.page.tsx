import { BACKGROUND_IMAGE_PATH } from '@/persistaence/constants';
import { appStore } from '@/store/app.store';

export function LobbyPage() {
  appStore.useChangeBackground(BACKGROUND_IMAGE_PATH);

  return <div>로비</div>;
}
