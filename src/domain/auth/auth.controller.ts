import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDTO, SignUpDTO, TokensDTO } from './dtos';

import { Public } from '@/common';

@Public()
@ApiTags('인증/인가')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '로그인' })
  @ApiUnauthorizedResponse()
  @ApiCreatedResponse({ type: TokensDTO })
  async login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }

  @Post('signup')
  @ApiOperation({ summary: '회원가입' })
  @ApiUnauthorizedResponse()
  @ApiCreatedResponse({ type: TokensDTO })
  async signUp(@Body() body: SignUpDTO) {
    return this.authService.signUp(body);
  }
}
