import { SetMetadata } from '@nestjs/common';
import { Role } from './users.interface';

export const Roles = (...args: Role[]) => SetMetadata('roles', args);
