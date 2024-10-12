export interface TokenPayload {
  id: number;
  partnerGroupId?: number;
  partnerId?: number;
  fulfillmentGroupId?: number;
  fulfillmentId?: number;
  convert?: boolean;
}
