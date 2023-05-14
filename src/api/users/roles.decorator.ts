import { SetMetadata } from '@nestjs/common';
import { Role } from './users.interface';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
