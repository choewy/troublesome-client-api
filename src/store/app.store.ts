import { useEffect } from 'react';

import { RecoilStore } from '@/persistaence/recoil-store';

export class AppStore extends RecoilStore<{
  background?: string;
}> {
  useChangeBackground(background?: string) {
    const setState = this.useSetState();

    useEffect(() => {
      setState((prev) => ({
        ...prev,
        background: background ? `url(${background})` : undefined,
      }));
    }, []);
  }
}

export const appStore = new AppStore('appStore', {});
