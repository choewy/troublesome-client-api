import { DynamicModule, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { v4 } from 'uuid';

import { ContextQueryLogger } from './context-query.logger';
import { ContextInterceptor } from './context.interceptor';
import { ContextService } from './context.service';
import { ContextPropertyKey } from './enums';

import { RequestHeader, ResponseHeader } from '@/common';

@Module({})
export class ContextModule extends ClsModule {
  public static forRoot(): DynamicModule {
    const clsModule = ClsModule.forRoot({
      middleware: {
        mount: true,
        setup(clsService, req, res) {
          req.id = req.get(RequestHeader.RequestID) ?? v4();
          res.set(ResponseHeader.RequestID, req.id);
          clsService.set(ContextPropertyKey.RequestId, req.id);
        },
      },
    });

    return {
      global: true,
      module: ContextModule,
      imports: [clsModule],
      providers: [ContextService, ContextQueryLogger, ContextInterceptor],
      exports: [ContextService, ContextQueryLogger, ContextInterceptor],
    };
  }
}
