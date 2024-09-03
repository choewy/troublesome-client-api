import { Body, Controller, Head, HttpCode, HttpStatus, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SkipAuthCheck } from './decorators';
import { AuthTokensDTO, LoginDTO, UpdatePasswordDTO } from './dtos';

@ApiTags('인증/인가')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Head()
  @ApiOperation({ summary: '인가 확인' })
  @ApiOkResponse()
  async check() {
    return;
  }

  @Post('login')
  @SkipAuthCheck()
  @ApiOperation({ summary: '로그인' })
  @ApiCreatedResponse({ type: AuthTokensDTO })
  async login(@Body() body: LoginDTO) {
    return new AuthTokensDTO(await this.authService.login(body));
  }

  @Patch('password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '비밀번호 변경' })
  @ApiNoContentResponse()
  async updatePassword(@Body() body: UpdatePasswordDTO) {
    return this.authService.updatePassword(body);
  }
}
