export enum RoleErrorCode {
  NotFound = 'ROLE_NOT_FOUND',
}

export enum RolePermissionScopeGlobal {
  All = '*',
  UserAll = 'user.*',
  UserReadAll = 'user.read.*',
  UserCreateAll = 'user.create.*',
  UserUpdateAll = 'user.update.*',
  UserDeleteAll = 'user.delete.*',
}

export enum RolePermissionScopePartial {
  UserReadList = 'user.read.list',
  UserReadProfile = 'user.read.profile',
  UserCreatePartner = 'user.create.partner',
  UserCreateDepot = 'user.create.depot',
  UserUpdateCredential = 'user.update.credential',
  UserUpdateProfile = 'user.update.profile',
  UserUpdateDetail = 'user.update.detail',
  UserDeletePartner = 'user.delete.partner',
  UserDeleteDepot = 'user.delete.depot',
}
