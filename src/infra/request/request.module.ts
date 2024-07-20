import { DynamicModule, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { v4 } from 'uuid';

import { RequestContextKey, RequestHeader } from './constants';
import { RequestService } from './request.service';

@Module({})
export class RequestModule {
  public static forRoot(): DynamicModule {
    return {
      global: true,
      module: RequestModule,
      imports: [
        ClsModule.forRoot({
          middleware: {
            mount: true,
            setup(cls, req, res) {
              req.id = req.get(RequestHeader.ID) ?? v4();
              res.set(RequestHeader.ID, req.id);
              cls.set(RequestContextKey.RequestID, req.id);
            },
          },
        }),
      ],
      providers: [RequestService],
      exports: [RequestService],
    };
  }
}
