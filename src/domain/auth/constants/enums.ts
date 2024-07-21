export enum AuthErrorCode {
  LoginFailed = 'AUTH_LOGIN_FAILED',
  NotAvailable = 'AUTH_NOT_AVAILABLE',
  TokenExpired = 'AUTH_TOKEN_EXPIRED',
  InvalidToken = 'AUTH_INVALID_TOKEN',
}

export enum AuthTokenType {
  AccessToken = 'ACCESS_TOKEN',
  RefreshToken = 'REFRESH_TOKEN',
}
