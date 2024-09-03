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
  UserCreateCenter = 'user.create.center',
  UserUpdateCredential = 'user.update.credential',
  UserUpdateProfile = 'user.update.profile',
  UserUpdateDetail = 'user.update.detail',
  UserDeletePartner = 'user.delete.partner',
  UserDeleteCenter = 'user.delete.center',
}
