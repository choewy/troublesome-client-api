export enum ErrorCode {
  AxiosError = 'AXIOS_ERROR',
  RequestError = 'REQUEST_ERROR',
  SysemError = 'SYSTEM_ERROR',
  ValidationError = 'VALIDATION_FAILED',
}

export enum RequestHeader {
  RequestID = 'x-request-id',
  AccessToken = 'authorization',
  RefreshToken = 'x-refresh-token',
}

export enum ResponseHeader {
  RequestID = 'X-REQUEST-ID',
  AccessToken = 'X-ACCESS-TOKEN',
  RefreshToken = 'X-REFRESH-TOKEN',
}
