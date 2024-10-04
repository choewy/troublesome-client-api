export enum PermissionTarget {
  User = 'user',
  Role = 'role',
  Permission = 'permission',
  PartnerGroup = 'partner-group',
  Partner = 'partner',
  Fulfillment = 'fulfillment',
  DeliveryCompany = 'delivery-company',
  EcommercePlatform = 'e-commerce-platform',
  Product = 'product',
  Dispatch = 'dispatch',
  Consigner = 'consigner',
  Box = 'box',
  Location = 'location',
  Invitation = 'invitation',
  Order = 'order',
  Purchaser = 'purchaser',
  Recall = 'recall',
  ReturnApproval = 'return-approval',
}

export enum PermissionLevel {
  Admin = 9,
  Delete = 4,
  Update = 3,
  Write = 2,
  Read = 1,
}
