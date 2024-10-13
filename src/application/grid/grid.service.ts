import { Injectable } from '@nestjs/common';

import { GridListDTO, UpdateGridDTO } from './dtos';

import { toBoolean, toNumber, toUndefined } from '@/common';
import { GridTarget } from '@/domain/grid/enums';
import { GridRepository } from '@/domain/grid/grid.repository';
import { ContextService } from '@/global';

@Injectable()
export class GridService {
  constructor(
    private readonly contextService: ContextService,
    private readonly gridRepository: GridRepository,
  ) {}

  async list(target: GridTarget) {
    const userId = this.contextService.getUser().id;

    return new GridListDTO(target, await this.gridRepository.findList(userId, target));
  }

  async update(target: GridTarget, body: UpdateGridDTO[]) {
    const userId = this.contextService.getUser().id;

    await this.gridRepository.updateMany(
      userId,
      target,
      body.map((args) => ({
        fieldName: args.fieldName,
        width: toUndefined(toNumber(args.width)),
        isVisible: toUndefined(toBoolean(args.isVisible)),
        isFixed: toUndefined(toBoolean(args.isFixed)),
      })),
    );
  }
}
