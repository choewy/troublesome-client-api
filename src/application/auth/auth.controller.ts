import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDTO, ConversionDTO, SignUpDTO, TokenMapDTO } from './dtos';

import { Private, Public } from '@/common';
import { PermissionTarget } from '@/domain/permission/enums';

@ApiTags('인증/인가')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiOperation({ summary: '로그인' })
  @ApiCreatedResponse({ type: TokenMapDTO })
  @ApiUnauthorizedResponse()
  async login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }

  @Post('signup')
  @Public()
  @ApiOperation({ summary: '회원가입' })
  @ApiCreatedResponse({ type: TokenMapDTO })
  @ApiUnauthorizedResponse()
  async signUp(@Body() body: SignUpDTO) {
    return this.authService.signUp(body);
  }

  @Post('conversion')
  @Private(PermissionTarget.Admin)
  @ApiOperation({ summary: '(시스템 관리자 전용) 파트너/풀필먼트 계정 전환' })
  @ApiCreatedResponse({ type: TokenMapDTO })
  @ApiUnauthorizedResponse()
  async conversion(@Body() body: ConversionDTO) {
    return this.authService.conversion(body);
  }
}
