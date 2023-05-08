import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import {
  ForgotPasswordRequestDto,
  LoginRequestDto,
  RegisterRequestDto,
  ResetPasswordRequestDto,
  TokenRequestDto,
} from './dto/requests';
import { AuthHelper } from './auth.helper';
import { UsersHelper } from '../users/users.helper';
import { EntityManager } from '@mikro-orm/core';
import { User } from '../users/entities';
import { validate } from 'class-validator';
import { EmailHelper } from 'src/common/helpers';

@Injectable()
export class AuthService {
  constructor(
    private readonly authHelper: AuthHelper,
    private readonly em: EntityManager,
    private readonly emailHelper: EmailHelper,
    private readonly usersHelper: UsersHelper,
    private readonly userRepository: UserRepository,
  ) {}

  public async login(body: LoginRequestDto, ipAddress: string) {
    const { email, password } = body;
    const user = await this.userRepository.findOne({ email });

    if (
      !user ||
      !user.isVerified ||
      !(await this.authHelper.isPasswordValid(password, user.passwordHash))
    ) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    // authentication successful so generate jwt and refresh tokens
    const jwtToken = await this.authHelper.generateJwtToken(user);
    const refreshToken = this.authHelper.generateRefreshToken(user, ipAddress);
    this.em.persistAndFlush(refreshToken);

    return {
      ...this.usersHelper.buildUserRO(user),
      jwtToken,
      refreshToken: refreshToken.token,
    };
  }

  public async refreshToken(token: string, ipAddress: string) {
    const refreshToken = await this.authHelper.getRefreshToken(token);
    const user = refreshToken.user;

    // replace old refresh token with a new one and save
    const newRefreshToken = this.authHelper.generateRefreshToken(
      user,
      ipAddress,
    );
    refreshToken.revoked = new Date();
    refreshToken.revokedByIp = ipAddress;
    refreshToken.replacedByToken = newRefreshToken.token;

    await this.em.persistAndFlush([refreshToken, newRefreshToken]);

    // generate new jwt
    const jwtToken = await this.authHelper.generateJwtToken(user);

    // return basic details and tokens
    return {
      ...this.usersHelper.buildUserRO(user),
      jwtToken,
      refreshToken: newRefreshToken.token,
    };
  }

  public async register(body: RegisterRequestDto, origin: string) {
    const { firstName, lastName, userName, email, password, acceptTerms } =
      body;

    // check uniqueness of userName/email
    const exists = await this.userRepository.count({
      $or: [{ email }, { userName }],
    });

    if (exists > 0) {
      // send already registered error in email to prevent user enumeration
      return await this.emailHelper.sendAlreadyRegisteredEmail(email, origin);
    }

    const user: User = new User(
      firstName,
      lastName,
      userName,
      email,
      acceptTerms,
    );
    user.passwordHash = await this.authHelper.encodePassword(password);
    user.verificationToken = this.authHelper.randomTokenString();

    const errors = await validate(user);
    if (errors.length > 0) {
      throw new BadRequestException('Input data validation failed');
    } else {
      // save user
      await this.em.persistAndFlush(user);
    }

    // send email
    await this.emailHelper.sendVerificationEmail(user, origin);
  }

  public async verifyEmail(body: TokenRequestDto) {
    const user = await this.userRepository.findOne({
      verificationToken: body.token,
    });

    if (!user) throw new BadRequestException('Verification failed');

    user.verified = new Date();
    user.verificationToken = null;

    await this.em.persistAndFlush(user);
  }

  public async forgotPassword(body: ForgotPasswordRequestDto, origin: string) {
    const { email } = body;
    const user = await this.userRepository.findOne({ email });

    // always return ok response to prevent email enumeration
    if (!user) return;

    user.resetToken = this.authHelper.randomTokenString();
    user.resetTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await this.em.persistAndFlush(user);

    // send email
    await this.emailHelper.sendPasswordResetEmail(user, origin);
  }

  public async validateResetToken(body: TokenRequestDto) {
    const { token } = body;
    const user = await this.userRepository.findOne({
      $and: [{ resetToken: token }, { resetTokenExpires: { $gt: new Date() } }],
    });

    if (!user) throw new BadRequestException('Invalid token');

    return user;
  }

  public async resetPassword(body: ResetPasswordRequestDto) {
    const { token, password } = body;
    const user = await this.validateResetToken({ token });

    // update password and remove reset token
    user.passwordHash = await this.authHelper.encodePassword(password);
    user.passwordReset = new Date();
    user.resetToken = null;
    user.resetTokenExpires = null;

    await this.em.persistAndFlush(user);
  }
}
