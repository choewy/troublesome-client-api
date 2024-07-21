import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SkipAuthCheck } from './decorators';
import { LoginDTO } from './dtos';

@ApiTags('인증/인가')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @SkipAuthCheck()
  @ApiOperation({ summary: '로그인' })
  @ApiCreatedResponse()
  async login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }
}
