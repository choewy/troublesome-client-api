import { NumberPKParamDTO } from '@common';
import { ApiAuthHeaders } from '@core';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RoleDTO, RoleListDTO, RoleListQueryDTO, SetRoleDTO, SetRoleUserMapDTO } from './dtos';
import { RoleService } from './role.service';

@ApiTags('역할')
@ApiAuthHeaders()
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @ApiOperation({ summary: '역할 목록 조회' })
  @ApiOkResponse({ type: RoleListDTO })
  async getList(@Query() query: RoleListQueryDTO) {
    return new RoleListDTO(await this.roleService.getList(query));
  }

  @Post()
  @ApiOperation({ summary: '역할 등록' })
  @ApiCreatedResponse()
  async create(@Body() body: SetRoleDTO) {
    return this.roleService.create(body);
  }

  @Get(':id(\\d+)')
  @ApiOperation({ summary: '역할 단일 조회' })
  @ApiOkResponse({ type: RoleDTO })
  async getById(@Param() param: NumberPKParamDTO) {
    return new RoleDTO(await this.roleService.getById(param.id));
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '역할 정보 수정' })
  @ApiNoContentResponse()
  async update(@Param() param: NumberPKParamDTO, @Body() body: SetRoleDTO) {
    return this.roleService.update(param.id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '역할 삭제' })
  @ApiNoContentResponse()
  async delete(@Param() param: NumberPKParamDTO) {
    return this.roleService.delete(param.id);
  }

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '역할 사용자 추가/삭제' })
  @ApiNoContentResponse()
  async insertOrRemoveUsers(@Body() body: SetRoleUserMapDTO) {
    return this.roleService.insertOrRemoveUsers(body);
  }
}
