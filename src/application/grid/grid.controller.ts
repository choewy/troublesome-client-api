import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';
import { ApiBody, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GridListDTO, GridListParamDTO, UpdateGridDTO } from './dtos';
import { GridService } from './grid.service';

import { Private } from '@/common';

@Private()
@ApiTags('그리드')
@Controller('grids')
export class GridController {
  constructor(private readonly gridService: GridService) {}

  @Get(':target')
  @ApiOperation({ summary: '그리드 목록 조회' })
  @ApiOkResponse({ type: GridListDTO })
  async list(@Param() param: GridListParamDTO) {
    return this.gridService.list(param.target);
  }

  @Patch(':target')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '그리드 정보 수정' })
  @ApiBody({ type: [UpdateGridDTO] })
  @ApiNoContentResponse()
  async update(@Param() param: GridListParamDTO, @Body() body: UpdateGridDTO[]) {
    return this.gridService.update(param.target, body);
  }
}
