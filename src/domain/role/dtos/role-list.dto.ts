import { ListDTOBuilder } from '@common';

import { RoleDTO } from './role.dto';
import { RoleEntity } from '../entities';

export class RoleListDTO extends ListDTOBuilder<RoleEntity, RoleDTO>(RoleDTO) {}
