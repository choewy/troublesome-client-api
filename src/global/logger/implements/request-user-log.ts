import { ContextUser } from '@/global/context/implements';

export class RequestUserLog {
  id: number;
  name: string;
  email: string;
  partnerGroup?: { id: number; name: string };
  partner?: { id: number; name: string };
  fulfillmentGroup?: { id: number; name: string };
  fulfillment?: { id: number; name: string };

  constructor(user: ContextUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;

    this.partnerGroup = user.partnerGroup
      ? {
          id: user.partnerGroup.id,
          name: user.partnerGroup.name,
        }
      : null;

    this.partner = user.partner
      ? {
          id: user.partner.id,
          name: user.partner.name,
        }
      : null;

    this.fulfillmentGroup = user.fulfillmentGroup
      ? {
          id: user.fulfillmentGroup.id,
          name: user.fulfillmentGroup.name,
        }
      : null;

    this.fulfillment = user.fulfillment
      ? {
          id: user.fulfillment.id,
          name: user.fulfillment.name,
        }
      : null;
  }
}
