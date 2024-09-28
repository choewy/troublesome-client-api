import { Global, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { v4 } from 'uuid';

import { ContextKey } from './enums';
import { ContextInterceptor, ContextService } from './providers';

import { RequestHeader, ResponseHeader } from '@/common';

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      middleware: {
        mount: true,
        setup(cls, req, res) {
          req.id = req.get(RequestHeader.RequestID) ?? v4();
          res.set(ResponseHeader.RequestID, req.id);
          cls.set(ContextKey.RequestId, req.id);
        },
      },
    }),
  ],
  providers: [ContextService, ContextInterceptor],
  exports: [ContextService],
})
export class ContextModule {}
