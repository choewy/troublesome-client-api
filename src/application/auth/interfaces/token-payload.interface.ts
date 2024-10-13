export interface TokenPayload {
  id: number;
  partnerGroupId?: number;
  partnerId?: number;
  fulfillmentGroupId?: number;
  fulfillmentId?: number;
  systemAdmin?: boolean;
  manager?: boolean;
}
