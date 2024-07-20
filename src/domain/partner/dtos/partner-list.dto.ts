import { ListDTOBuilder } from '@common';

import { PartnerDTO } from './partner.dto';
import { PartnerEntity } from '../entities';

export class PartnerListDTO extends ListDTOBuilder<PartnerEntity, PartnerDTO>(PartnerDTO) {}
