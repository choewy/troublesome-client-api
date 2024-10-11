import { TokenPayload } from './token-payload.interface';

export interface TokenVerifyResult {
  payload: TokenPayload | null;
  error: unknown;
  expired: boolean;
}
