import { DeepPartial } from 'typeorm';

import { GridEntity } from './grid.entity';

export type GridType<T> = { fieldName: keyof T } & DeepPartial<Omit<GridEntity, 'fieldName'>>;
