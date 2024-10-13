import { ExecutionContext, Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

import { ContextKey } from '../enums';
import { ContextUser, ContextUserRelation } from '../implements';

@Injectable()
export class ContextService {
  constructor(private readonly clsService: ClsService) {}

  getRequestId(): string {
    return this.clsService.get(ContextKey.RequestId) ?? null;
  }

  getExecutionContext(): ExecutionContext {
    return this.clsService.get(ContextKey.Context) ?? null;
  }

  setConext(context: ExecutionContext) {
    this.clsService.set(ContextKey.Context, context);
  }

  getContext() {
    return this.clsService.get(ContextKey.Context) ?? null;
  }

  setUser(user: ContextUser) {
    this.clsService.set(ContextKey.User, user);
  }

  getUser(): ContextUser | null {
    return this.clsService.get(ContextKey.User) ?? null;
  }

  canAccessPartner<T extends Pick<ContextUserRelation, 'id'> & { partnerGroupId: number }>(partner: T) {
    const userContext = this.getUser();

    return (
      (userContext.partner === null && userContext.partnerGroup === null) ||
      (userContext.partner && userContext.partner.id !== partner.id) ||
      (userContext.partnerGroup && userContext.partnerGroup.id !== partner.partnerGroupId)
    );
  }

  canAccessFulfillment<T extends Pick<ContextUserRelation, 'id'> & { fulfillmentGroupId: number }>(fulfillment: T) {
    const userContext = this.getUser();

    return (
      (userContext.fulfillment === null && userContext.fulfillmentGroup === null) ||
      (userContext.fulfillment && userContext.fulfillment.id !== fulfillment.id) ||
      (userContext.fulfillmentGroup && userContext.fulfillmentGroup.id !== fulfillment.fulfillmentGroupId)
    );
  }
}
