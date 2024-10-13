import { UserType } from '@/domain/user/enums';

export interface TokenPayload {
  id: number;
  type: UserType;
  partnerGroupId?: number;
  partnerId?: number;
  fulfillmentGroupId?: number;
  fulfillmentId?: number;
}
