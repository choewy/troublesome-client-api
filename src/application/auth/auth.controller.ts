import { Body, Controller, HttpCode, HttpStatus, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDTO, SignUpDTO, TokensDTO, UpdatePasswordDTO } from './dtos';

import { Private, Public } from '@/common';

@ApiTags('인증/인가')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiOperation({ summary: '로그인' })
  @ApiCreatedResponse({ type: TokensDTO })
  async login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }

  @Post('signup')
  @Public()
  @ApiOperation({ summary: '회원가입' })
  @ApiCreatedResponse({ type: TokensDTO })
  async signUp(@Body() body: SignUpDTO) {
    return this.authService.signUp(body);
  }

  @Patch('password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Private()
  @ApiOperation({ summary: '비밀번호 변경' })
  @ApiNoContentResponse()
  async updatePassword(@Body() body: UpdatePasswordDTO) {
    return this.authService.updatePassword(body);
  }
}
