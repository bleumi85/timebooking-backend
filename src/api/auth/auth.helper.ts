import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { User } from '../users/entities';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from '../refresh-tokens/entities';
import { RefreshTokenRepository } from '../refresh-tokens/refresh-tokens.repository';
import { UserRepository } from '../users/users.repository';

@Injectable()
export class AuthHelper {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rtRepository: RefreshTokenRepository,
    private readonly jwt: JwtService,
  ) { }

  // Encode User's password
  public async encodePassword(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);
  }

  // Generate JWT Token
  public async generateJwtToken(user: User): Promise<string> {
    return this.jwt.signAsync({
      id: user.id,
      email: user.email,
      userName: user.userName,
    });
  }

  // Generate Refresh Token
  public generateRefreshToken(user: User, ipAddress: string) {
    return new RefreshToken(user, this.randomTokenString(), ipAddress);
  }

  // Get RefreshToken if available
  public async getRefreshToken(token: string): Promise<RefreshToken | never> {
    const refreshToken = await this.rtRepository.findOne(
      { token },
      { fields: ['user'] },
    );
    if (!refreshToken || !refreshToken.isActive) {
      throw new NotFoundException('Invalid token');
    }
    return refreshToken;
  }

  // Validate User's password
  public async isPasswordValid(
    password: string,
    comparePassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, comparePassword);
  }

  // Generate random token string
  public randomTokenString(): string {
    return crypto.randomBytes(40).toString('hex');
  }

  // Get User by ID we get from decode
  public async validateUser(decoded: any): Promise<User> {
    return await this.userRepository.findOne(decoded.id)
  }
}
