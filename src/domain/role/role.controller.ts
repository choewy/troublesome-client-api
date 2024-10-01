import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RoleService } from './role.service';

import { Private } from '@/common';

@Private()
@ApiTags('역할')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
}
