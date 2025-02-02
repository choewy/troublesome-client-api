import { atom, RecoilState, useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

export abstract class RecoilStore<T> {
  private readonly store: RecoilState<T>;

  constructor(key: string, value: T) {
    this.store = atom({ key, default: value });
  }

  useValue() {
    return useRecoilValue(this.store);
  }

  useState() {
    return useRecoilState(this.store);
  }

  useSetState() {
    return useSetRecoilState(this.store);
  }

  useResetState() {
    return useResetRecoilState(this.store);
  }
}
