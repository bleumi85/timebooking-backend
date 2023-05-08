import { Body, Controller, HttpCode, HttpStatus, Inject, Post, Req, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CookieOptions, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/requests';
import { LoginResponseDto } from './dto/responses';

const name = 'auth'

@ApiTags(name)
@Controller(name)
export class AuthController {
    @Inject(AuthService)
    private readonly service: AuthService;

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: HttpStatus.OK, description: 'Login successful', type: LoginResponseDto })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Could not log in'})
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Unhandled error'})
    async login(@Body() loginDto: LoginRequestDto, @Req() req: Request, @Res() res: Response) {
        const ipAddress: string = req.ip;
        const { refreshToken, ...rest } = await this.service.login(loginDto, ipAddress);
        this.setTokenCookie(res, refreshToken);
        return res.json(rest);
    }

    @Post('refresh-token')
    @HttpCode(HttpStatus.OK)
    async refreshToken() {
        return 'Log In!'
    }

    @Post('revoke-token')
    @HttpCode(HttpStatus.OK)
    async revokeToken() {
        return 'Log In!'
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    async register() {
        return 'Log In!'
    }

    @Post('verify-email')
    @HttpCode(HttpStatus.OK)
    async verifyEmail() {
        return 'Log In!'
    }

    @Post('forgot-password')
    @HttpCode(HttpStatus.OK)
    async forgotPassword() {
        return 'Log In!'
    }

    @Post('validate-reset-token')
    @HttpCode(HttpStatus.OK)
    async validateResetToken() {
        return 'Log In!'
    }

    @Post('reset-password')
    @HttpCode(HttpStatus.OK)
    async resetPassword() {
        return 'Log In!'
    }

    // helper function
    private setTokenCookie(res: Response, token: string) {
        const cookieOptions: CookieOptions = {
            httpOnly: true,
            sameSite: 'strict',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        };
        res.cookie('jbl_dev_token', token, cookieOptions);
    }
}
