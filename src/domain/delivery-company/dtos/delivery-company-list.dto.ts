import { ListDTOBuilder } from '@common';

import { DeliveryCompanyDTO } from './delivery-company.dto';
import { DeliveryCompanyEntity } from '../entities';

export class DeliveryCompanyListDTO extends ListDTOBuilder<DeliveryCompanyEntity, DeliveryCompanyDTO>(DeliveryCompanyDTO) {}
