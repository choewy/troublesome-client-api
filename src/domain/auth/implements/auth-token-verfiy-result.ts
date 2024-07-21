import { AuthTokenPayload } from './auth-token-payload';
import { AuthErrorCode } from '../constants';

export class AuthTokenVerifyResult {
  payload: AuthTokenPayload = null;
  errorCode: AuthErrorCode = null;
}
