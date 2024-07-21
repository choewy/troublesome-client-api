export enum ErrorCode {
  AxiosError = 'AXIOS_ERROR',
  RequestError = 'REQUEST_ERROR',
  SysemError = 'SYSTEM_ERROR',
  ValidationError = 'VALIDATION_FAILED',
}

export enum RequestHeader {
  AccessToken = 'authorization',
  RefreshToken = 'x_refresh_token',
}

export enum ResponseHeader {
  AccessToken = 'X_ACCESS_TOKEN',
  RefreshToken = 'X_REFRESH_TOKEN',
}
