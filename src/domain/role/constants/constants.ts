import { RolePermissionScopeGlobal, RolePermissionScopePartial } from './enums';

export const RolePermissionScopeValues = []
  .concat(Object.values(RolePermissionScopeGlobal))
  .concat(Object.values(RolePermissionScopePartial));
