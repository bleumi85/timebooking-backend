import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from './jwt/jwt.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RefreshToken } from '../refresh-tokens/entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../users/entities';
import { AuthHelper } from './auth.helper';
import { UsersHelper } from '../users/users.helper';
import { EmailHelper } from 'src/common/helpers';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule,
    MikroOrmModule.forFeature([RefreshToken, User]),
  ],
  providers: [AuthHelper, AuthService, EmailHelper, UsersHelper],
  controllers: [AuthController],
})
export class AuthModule {}
