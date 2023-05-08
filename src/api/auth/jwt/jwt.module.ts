import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule as JwtModuleNest } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModuleNest.registerAsync({
            global: true,
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('jwt.secret'),
                signOptions: { expiresIn: config.get<string>('jwt.expiresIn') }
            }),
        }),
    ],
})
export class JwtModule { }
