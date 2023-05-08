import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CookieOptions, Request, Response } from 'express';
import { AuthService } from './auth.service';
import {
  ForgotPasswordRequestDto,
  LoginRequestDto,
  RegisterRequestDto,
  ResetPasswordRequestDto,
  TokenRequestDto,
} from './dto/requests';
import { LoginResponseDto, MessageResponseDto } from './dto/responses';

const name = 'auth';

@ApiTags(name)
@Controller(name)
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login successful',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Could not log in',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Unhandled error',
  })
  async login(
    @Body() loginDto: LoginRequestDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const ipAddress: string = req.ip;
    const { refreshToken, ...rest } = await this.service.login(
      loginDto,
      ipAddress,
    );
    this.setTokenCookie(res, refreshToken);
    return res.json(rest);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const token: string = req.cookies.jbl_dev_token;
    const ipAddress: string = req.ip;
    const { refreshToken, ...rest } = await this.service.refreshToken(
      token,
      ipAddress,
    );
    this.setTokenCookie(res, refreshToken);
    return res.json(rest);
  }

  @Post('revoke-token')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  async revokeToken() {
    return 'Revoke Token!';
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiHeader({ name: 'host', required: false })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login successful',
    type: MessageResponseDto,
  })
  async register(
    @Body() registerDto: RegisterRequestDto,
    @Headers('host') origin: string,
  ) {
    await this.service.register(registerDto, origin);
    return {
      message:
        'Registration successful, please check your email for verification instructions',
    };
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Verification successful',
    type: MessageResponseDto,
  })
  async verifyEmail(@Body() tokenDto: TokenRequestDto) {
    await this.service.verifyEmail(tokenDto);
    return { message: 'Verification successful, you can now login' };
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiHeader({ name: 'host', required: false })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Please check your email',
    type: MessageResponseDto,
  })
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordRequestDto,
    @Headers('host') origin: string,
  ) {
    await this.service.forgotPassword(forgotPasswordDto, origin);
    return {
      message: 'Please check your email for password reset instructions',
    };
  }

  @Post('validate-reset-token')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Please check your email',
    type: MessageResponseDto,
  })
  async validateResetToken(@Body() tokenDto: TokenRequestDto) {
    await this.service.validateResetToken(tokenDto);
    return { message: 'Token is valid' };
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password reset successful',
    type: MessageResponseDto,
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordRequestDto) {
    await this.service.resetPassword(resetPasswordDto);
    return { message: 'Password reset successful, you can now login' };
  }

  // helper function
  private setTokenCookie(res: Response, token: string) {
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };
    res.cookie('jbl_dev_token', token, cookieOptions);
  }
}
