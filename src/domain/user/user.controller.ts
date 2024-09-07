import { NumberPKParamDTO } from '@common';
import { ApiAuthHeaders } from '@core';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Query } from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UpdateUserDTO, UserDTO, UserListDTO, UserListQueryDTO } from './dtos';
import { UserService } from './user.service';

@ApiTags('사용자')
@ApiAuthHeaders()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '사용자 목록 조회' })
  @ApiOkResponse({ type: UserListDTO })
  async getList(@Query() query: UserListQueryDTO) {
    return new UserListDTO(await this.userService.getList(query));
  }

  @Get(':id(\\d+)')
  @ApiOperation({ summary: '사용자 단일 조회' })
  @ApiOkResponse({ type: UserDTO })
  async getById(@Param() param: NumberPKParamDTO) {
    return new UserDTO(await this.userService.getById(param.id));
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '사용자 정보 수정' })
  @ApiNoContentResponse()
  async update(@Param() param: NumberPKParamDTO, @Body() body: UpdateUserDTO) {
    return this.userService.update(param.id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '사용자 정보 삭제' })
  @ApiNoContentResponse()
  async delete(@Param() param: NumberPKParamDTO) {
    return this.userService.delete(param.id);
  }
}
