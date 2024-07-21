import { RequestHeader, ResponseHeader } from '@common';
import { DynamicModule, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { v4 } from 'uuid';

import { RequestContextKey } from './constants';
import { RequestContextInterceptor } from './request-context.interceptor';
import { RequestContextService } from './request-context.service';

@Module({})
export class RequestContextModule {
  public static forRoot(): DynamicModule {
    return {
      global: true,
      module: RequestContextModule,
      imports: [
        ClsModule.forRoot({
          middleware: {
            mount: true,
            setup(cls, req, res) {
              req.id = req.get(RequestHeader.RequestID) ?? v4();
              res.set(ResponseHeader.RequestID, req.id);
              cls.set(RequestContextKey.RequestID, req.id);
            },
          },
        }),
      ],
      providers: [RequestContextService, RequestContextInterceptor],
      exports: [RequestContextService],
    };
  }
}
