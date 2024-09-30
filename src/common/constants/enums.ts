export enum SetMetadataKey {
  AccessModifier = '__ACCESS_MODIFIER__',
  Privilige = '__PRIVILIGE__',
  UserType = '__USER_TYPE__',
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
