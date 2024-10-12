export enum FulfillmentModuleErrorCode {
  UserAlreadyExist = 'FULFILLMENT_USER_ALREADY_EXIST',
  UserPasswordsMispatch = 'FULFILLMENT_USER_PASSWORDS_MISMATCH',
  AlreadyExistPlantCode = 'FULFILLMENT_ALREADY_EXIST_PLANT_CODE',
  NotFoundDefaultDeliveryCompany = 'FULFILLMENT_NOT_FOUND_DEFAULT_DELIVERY_COMPANY',
  NotFoundFulfillment = 'FULFILLMENT_NOT_FOUND',
  NotSelectedFulfillmentGroup = 'FULFILLMENT_NOT_SELECTED_FULFILLMENT_GROUP',
  CannotUpdateOrDelete = 'FULFILLMENT_CANNOT_UPDATE_OR_DELETE',
}
