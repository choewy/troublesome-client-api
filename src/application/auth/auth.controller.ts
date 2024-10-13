import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDTO, ConvertDTO, SignUpDTO, TokenMapDTO, UpdatePasswordDTO, UserContextDTO } from './dtos';

import { Private, Public } from '@/common';
import { PermissionTarget } from '@/domain/permission/enums';

@ApiTags('인증/인가')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @Private()
  @ApiOperation({ summary: '로그인 정보' })
  @ApiOkResponse({ type: UserContextDTO })
  @ApiUnauthorizedResponse()
  async auth() {
    return this.authService.auth();
  }

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

  @Patch('password')
  @Private()
  @ApiOperation({ summary: '비밀번호 변경' })
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse()
  async updatePassword(@Body() body: UpdatePasswordDTO) {
    return this.authService.updatePassword(body);
  }

  @Post('convert')
  @Private(PermissionTarget.PartnerAll, PermissionTarget.FulfillmentAll)
  @ApiOperation({ summary: '소속 전환' })
  @ApiCreatedResponse({ type: TokenMapDTO })
  @ApiUnauthorizedResponse()
  async convert(@Body() body: ConvertDTO) {
    return this.authService.convert(body);
  }
}
