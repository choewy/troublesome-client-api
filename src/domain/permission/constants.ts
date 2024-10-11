import { PermissionTarget } from './enums';

export const FULFILLMENT_ADMIN_PERMISSION_TARGETS: PermissionTarget[] = [
  PermissionTarget.RoleAll,
  PermissionTarget.UserAll,
  PermissionTarget.FulfillmentAll,
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
