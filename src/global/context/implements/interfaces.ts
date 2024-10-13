export interface ContextUserPermission {
  id: number;
  target: string;
}

export interface ContextUserRole {
  id: number;
  name: string;
  permissions: ContextUserPermission[];
}

export interface ContextUserRoles {
  userId: number;
  roleId: number;
  role: ContextUserRole;
}

export interface ContextUserRelation {
  id: number;
  name: string;
}

export interface ContextUser {
  id: number;
  name: string;
  email: string;
  roles: ContextUserRoles[];
  partnerGroup?: ContextUserRelation;
  partner?: ContextUserRelation;
  fulfillmentGroup?: ContextUserRelation;
  fulfillment?: ContextUserRelation;
  systemAdmin?: boolean;
  manager?: boolean;
}
