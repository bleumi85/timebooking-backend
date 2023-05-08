import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import { LoginDto } from './dto';
import { AuthHelper } from './auth.helper';
import { UsersHelper } from '../users/users.helper';

@Injectable()
export class AuthService {
    constructor(
        private readonly authHelper: AuthHelper,
        private readonly usersHelper: UsersHelper,
        private readonly userRepository: UserRepository
    ) { }

    public async login(body: LoginDto, ipAddress: string) {
        const { email, password } = body;
        const user = await this.userRepository.findOne({ email });

        if (!user || !user.isVerified || !(await this.authHelper.isPasswordValid(password, user.passwordHash))) {
            throw new UnauthorizedException('Email or password is incorrect');
        }

        // authentication successful so generate jwt and refresh tokens
        const jwtToken = 'abcd';
        const refreshToken = { token: 'efgh' }

        return {
            ...this.usersHelper.buildUserRO(user),
            jwtToken,
            refreshToken: refreshToken.token,
        }
    }
}
