export enum SetMetadataKey {
  AccessModifier = '__ACCESS_MODIFIER__',
  AccessModifierOptions = '__ACCESS_MODIFIER_OPTIONS__',
  Privilige = '__PRIVILIGE__',
  UserType = '__USER_TYPE__',
}

export enum PrivateOptions {
  SystemAdmin = '__SYSTEM_ADMIN__',
  PartnerGroup = '__PARTNER_GROUP__',
  Partner = '__PARTNER__',
  Fulfillment = '__FULFILLMENT__',
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
