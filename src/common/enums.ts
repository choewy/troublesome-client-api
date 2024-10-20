export enum NodeEnv {
  Local = 'local',
  Test = 'test',
  Development = 'development',
  Production = 'production',
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

export enum SetMetadataKey {
  AccessModifier = 'accessModifier',
  PermissionTargets = 'permissionTargets',
}
