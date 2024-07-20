import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

import { RequestContextKey } from './constants';

@Injectable()
export class RequestContextService {
  constructor(private readonly clsService: ClsService) {}

  public get requestId() {
    return this.clsService.get(RequestContextKey.RequestID) ?? null;
  }
}
