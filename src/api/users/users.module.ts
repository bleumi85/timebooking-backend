import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersHelper } from './users.helper';
import { AuthModule } from '../auth/auth.module';
import { User } from './entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  providers: [UsersService, UsersHelper],
  controllers: [UsersController],
  imports: [
    AuthModule,
    MikroOrmModule.forFeature([User])
  ]
})
export class UsersModule { }
