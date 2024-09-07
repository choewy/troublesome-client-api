import { ApiAuthHeaders } from '@core';
import { Body, Controller, HttpCode, HttpStatus, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SkipAuthCheck } from './decorators';
import { AuthDTO, AuthTokensDTO, SignInDTO, SignUpDTO, UpdatePasswordDTO } from './dtos';

@ApiTags('인증/인가')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiAuthHeaders()
  @ApiOperation({ summary: '인가 확인' })
  @ApiOkResponse({ type: AuthDTO })
  async authCheck() {
    return this.authService.authCheck();
  }

  @Post('signin')
  @SkipAuthCheck()
  @ApiOperation({ summary: '로그인' })
  @ApiCreatedResponse({ type: AuthTokensDTO })
  async signin(@Body() body: SignInDTO) {
    return new AuthTokensDTO(await this.authService.signin(body));
  }

  @Post('signup')
  @SkipAuthCheck()
  @ApiOperation({ summary: '회원가입' })
  @ApiCreatedResponse({ type: AuthTokensDTO })
  async signup(@Body() body: SignUpDTO) {
    return new AuthTokensDTO(await this.authService.signup(body));
  }

  @Patch('password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '비밀번호 변경' })
  @ApiNoContentResponse()
  async updatePassword(@Body() body: UpdatePasswordDTO) {
    return this.authService.updatePassword(body);
  }
}
