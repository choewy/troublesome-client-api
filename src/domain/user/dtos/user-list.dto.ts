import { ListDTOBuilder } from '@common';

import { UserDTO } from './user.dto';
import { UserEntity } from '../entities';

export class UserListDTO extends ListDTOBuilder<UserEntity, UserDTO>(UserDTO) {}
