import { ListDTOBuilder } from '@common';

import { CenterDTO } from './center.dto';
import { CenterEntity } from '../entities';

export class CenterListDTO extends ListDTOBuilder<CenterEntity, CenterDTO>(CenterDTO) {}
