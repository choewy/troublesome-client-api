export interface RequestUserPartnerGroup {
  id: number;
  name: string;
}

export interface RequestUserPartner {
  id: number;
  name: string;
}

export interface RequestUserFulfillment {
  id: number;
  name: string;
}

export interface RequestUser {
  id: number;
  name: string;
  email: string;
  partnerGroup?: RequestUserPartner;
  partner?: RequestUserPartner;
  fulfillment?: RequestUserFulfillment;
}
