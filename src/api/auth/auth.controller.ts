import { Body, Controller, HttpCode, HttpStatus, Inject, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';

const name = 'auth'

@ApiTags(name)
@Controller(name)
export class AuthController {
    @Inject(AuthService)
    private readonly service: AuthService;

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto, @Req() req: Request, @Res() res: Response) {
        const ipAddress: string = req.ip;
        const x = await this.service.login(loginDto, ipAddress);
        return 'Log In!'
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
}
