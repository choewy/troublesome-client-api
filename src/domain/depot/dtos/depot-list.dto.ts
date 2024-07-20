import { ListDTOBuilder } from '@common';

import { DepotDTO } from './depot.dto';
import { DepotEntity } from '../entities';

export class DepotListDTO extends ListDTOBuilder<DepotEntity, DepotDTO>(DepotDTO) {}
