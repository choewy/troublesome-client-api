import { OmitType, PartialType } from '@nestjs/mapped-types';

import { CreateFulfillmentDTO } from './create-fulfillment.dto';

export class UpdateFulfillmentDTO extends PartialType(OmitType(CreateFulfillmentDTO, ['admin'] as const)) {}
