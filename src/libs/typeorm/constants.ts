import { PermissionTarget } from './enums';

export const SYSTEM_ADMIN_PERMISSION_TARGETS: PermissionTarget[] = [PermissionTarget.Admin];

export const PARTNER_GROUP_MANAGER_PERMISSION_TARGETS: PermissionTarget[] = [PermissionTarget.PartnerAll];

export const PARTNER_MANAGER_PERMISSION_TARGETS: PermissionTarget[] = [];

export const PARTNER_USER_PERMISSION_TARGETS: PermissionTarget[] = [];

export const FULFILLMENT_GROUP_MANAGER_PERMISSION_TARGETS: PermissionTarget[] = [PermissionTarget.FulfillmentAll];

export const FULFILLMENT_MANAGER_PERMISSION_TARGETS: PermissionTarget[] = [
  PermissionTarget.RoleAll,
  PermissionTarget.UserAll,
  PermissionTarget.FulfillmentRead,
  PermissionTarget.PartnerRead,
  PermissionTarget.DeliveryCompanyRead,
  PermissionTarget.EcommercePlatformRead,
  PermissionTarget.ProductRead,
  PermissionTarget.DispatchAll,
  PermissionTarget.ConsignerAll,
  PermissionTarget.BoxAll,
  PermissionTarget.LocationAll,
  PermissionTarget.InvitationAll,
  PermissionTarget.OrderRead,
  PermissionTarget.RecallRequestRead,
  PermissionTarget.RecallRequestUpdate,
  PermissionTarget.ReturnApprovalRead,
  PermissionTarget.ReturnApprovalUpdate,
];

export const FULFILLMENT_USER_PERMISSION_TARGETS: PermissionTarget[] = [
  PermissionTarget.RoleRead,
  PermissionTarget.UserRead,
  PermissionTarget.FulfillmentRead,
  PermissionTarget.PartnerRead,
  PermissionTarget.DeliveryCompanyRead,
  PermissionTarget.EcommercePlatformRead,
  PermissionTarget.ProductRead,
  PermissionTarget.DispatchRead,
  PermissionTarget.ConsignerRead,
  PermissionTarget.BoxRead,
  PermissionTarget.LocationRead,
  PermissionTarget.OrderRead,
  PermissionTarget.RecallRequestRead,
  PermissionTarget.ReturnApprovalRead,
];
