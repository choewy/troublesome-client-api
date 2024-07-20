import { DynamicModule, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { v4 } from 'uuid';

import { RequestContextKey, RequestContextHeader } from './constants';
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
              req.id = req.get(RequestContextHeader.ID) ?? v4();
              res.set(RequestContextHeader.ID, req.id);
              cls.set(RequestContextKey.RequestID, req.id);
            },
          },
        }),
      ],
      providers: [RequestContextService],
      exports: [RequestContextService],
    };
  }
}
