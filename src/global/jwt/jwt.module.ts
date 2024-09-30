import { Global, Module } from '@nestjs/common';
import { JwtService, JwtModule as NestJwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [NestJwtModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
