import { FulfillmentDTO } from './fulfillment.dto';

import { ListDTOBuilder } from '@/common';

export class FulfillmentListDTO extends ListDTOBuilder(FulfillmentDTO) {}
