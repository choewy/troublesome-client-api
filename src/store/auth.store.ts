import { RecoilStore } from '@/persistaence/recoil-store';
import { AuthApiResponseType } from '@/persistaence/types';

export class AuthStore extends RecoilStore<{
  ok: boolean | null;
  auth: AuthApiResponseType | null;
}> {}

export const authStore = new AuthStore('authStore', { ok: null, auth: null });
