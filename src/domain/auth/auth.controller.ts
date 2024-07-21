import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SkipAuthCheck } from './decorators';
import { AuthTokensDTO, LoginDTO } from './dtos';

@ApiTags('인증/인가')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @SkipAuthCheck()
  @ApiOperation({ summary: '로그인' })
  @ApiCreatedResponse({ type: AuthTokensDTO })
  async login(@Body() body: LoginDTO) {
    return new AuthTokensDTO(await this.authService.login(body));
  }
}
