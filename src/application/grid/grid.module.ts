import { Module } from '@nestjs/common';

import { GridController } from './grid.controller';
import { GridService } from './grid.service';

import { GridRepository } from '@/domain/grid/grid.repository';

@Module({
  controllers: [GridController],
  providers: [GridService, GridRepository],
})
export class GridModule {}
