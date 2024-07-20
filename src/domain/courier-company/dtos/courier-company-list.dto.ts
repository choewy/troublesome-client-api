import { ListDTOBuilder } from '@common';

import { CourierCompanyDTO } from './courier-company.dto';
import { CourierCompanyEntity } from '../entities';

export class CourierCompanyListDTO extends ListDTOBuilder<CourierCompanyEntity, CourierCompanyDTO>(CourierCompanyDTO) {}
