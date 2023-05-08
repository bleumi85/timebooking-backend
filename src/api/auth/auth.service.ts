import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import { LoginRequestDto } from './dto/requests';
import { AuthHelper } from './auth.helper';
import { UsersHelper } from '../users/users.helper';
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class AuthService {
    constructor(
        private readonly authHelper: AuthHelper,
        private readonly em: EntityManager,
        private readonly usersHelper: UsersHelper,
        private readonly userRepository: UserRepository
    ) { }

    public async login(body: LoginRequestDto, ipAddress: string) {
        const { email, password } = body;
        const user = await this.userRepository.findOne({ email });

        if (!user || !user.isVerified || !(await this.authHelper.isPasswordValid(password, user.passwordHash))) {
            throw new UnauthorizedException('Email or password is incorrect');
        }

        // authentication successful so generate jwt and refresh tokens
        const jwtToken = await this.authHelper.generateJwtToken(user);
        const refreshToken = this.authHelper.generateRefreshToken(user, ipAddress);

        await this.em.persistAndFlush(refreshToken);

        return {
            ...this.usersHelper.buildUserRO(user),
            jwtToken,
            refreshToken: refreshToken.token,
        }
    }
}
