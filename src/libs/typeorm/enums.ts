export enum BoxType {
  Ambient = '실온',
  Refrigerated = '냉장',
  Frozen = '냉동',
}

export enum ClaimType {
  Exchange = 0,
  Return = 1,
}

export enum GridTarget {
  User = 'user',
  DeliveryCompany = 'delivery_company',
  DeliveryCompanySetting = 'delivery_company_setting',
}

export enum InventoryStatus {
  Availabled = 1,
  Disabled = 2,
}

export enum OrderStatus {
  Wating = 0,
  Complete = 1,
  Cancle = 2,
}

export enum ProductType {
  Single = '단품',
  Set = '세트',
}

export enum ProductUnit {
  Each = 'EA',
  Package = 'PK',
  Case = 'CS',
}

export enum ProductTemperature {
  Ambient = '실온',
  RefrigeratedOrFrozen = '냉장/냉동',
}

export enum RecallStatus {
  Wating = 0,
  Complete = 1,
  Cancel = 2,
}

export enum RolePK {
  SystemAdmin = 1,
  PartnerGroupManager = 2,
  FulfillmentGroupManager = 3,
}

export enum PermissionTarget {
  Admin = '*',
  UserAll = 'user.*',
  UserRead = 'user.read',
  UserUpdate = 'user.update',
  UserDelete = 'user.delete',
  RoleAll = 'role.*',
  RoleRead = 'role.read',
  RoleCreate = 'role.create',
  RoleUpdate = 'role.update',
  RoleDelete = 'role.delete',
  PartnerAll = 'partner.*',
  PartnerRead = 'partner.read',
  PartnerCreate = 'partner.create',
  PartnerUpdate = 'partner.update',
  PartnerDelete = 'partner.delete',
  FulfillmentAll = 'fulfillment.*',
  FulfillmentRead = 'fulfillment.read',
  FulfillmentCreate = 'fulfillment.create',
  FulfillmentUpdate = 'fulfillment.update',
  FulfillmentDelete = 'fulfillment.delete',
  DeliveryCompanyAll = 'delivery-company.*',
  DeliveryCompanyRead = 'delivery-company.read',
  DeliveryCompanyCreate = 'delivery-company.create',
  DeliveryCompanyUpdate = 'delivery-company.update',
  DeliveryCompanyDelete = 'delivery-company.delete',
  EcommercePlatformAll = 'e-commerce-platform.*',
  EcommercePlatformRead = 'e-commerce-platform.read',
  EcommercePlatformCreate = 'e-commerce-platform.create',
  EcommercePlatformUpdate = 'e-commerce-platform.update',
  EcommercePlatformDelete = 'e-commerce-platform.delete',
  ProductAll = 'product.*',
  ProductRead = 'product.read',
  ProductCreate = 'product.create',
  ProductUpdate = 'product.update',
  ProductDelete = 'product.delete',
  DispatchAll = 'dispatch.*',
  DispatchRead = 'dispatch.read',
  DispatchCreate = 'dispatch.create',
  DispatchUpdate = 'dispatch.update',
  DispatchDelete = 'dispatch.delete',
  ConsignerAll = 'consigner.*',
  ConsignerRead = 'consigner.read',
  ConsignerCreate = 'consigner.create',
  ConsignerUpdate = 'consigner.update',
  ConsignerDelete = 'consigner.delete',
  BoxAll = 'box.*',
  BoxRead = 'box.read',
  BoxCreate = 'box.create',
  BoxUpdate = 'box.update',
  BoxDelete = 'box.delete',
  LocationAll = 'location.*',
  LocationRead = 'location.read',
  LocationCreate = 'location.create',
  LocationUpdate = 'location.update',
  LocationDelete = 'location.delete',
  InvitationAll = 'invitation.*',
  InvitationRead = 'invitation.read',
  InvitationCreate = 'invitation.create',
  InvitationUpdate = 'invitation.update',
  InvitationDelete = 'invitation.delete',
  OrderAll = 'order.*',
  OrderRead = 'order.read',
  OrderCreate = 'order.create',
  OrderUpdate = 'order.update',
  OrderDelete = 'order.delete',
  PurchaserAll = 'purchaser.*',
  PurchaserRead = 'purchaser.read',
  PurchaserCreate = 'purchaser.create',
  PurchaserUpdate = 'purchaser.update',
  PurchaserDelete = 'purchaser.delete',
  RecallRequestAll = 'recall.request.*',
  RecallRequestRead = 'recall.request.read',
  RecallRequestCreate = 'recall.request.create',
  RecallRequestUpdate = 'recall.request.update',
  RecallRequestDelete = 'recall.request.delete',
  ReturnApprovalAll = 'return-approval.*',
  ReturnApprovalRead = 'return-approval.read',
  ReturnApprovalCreate = 'return-approval.create',
  ReturnApprovalUpdate = 'return-approval.update',
  ReturnApprovalDelete = 'return-approval.delete',
}
