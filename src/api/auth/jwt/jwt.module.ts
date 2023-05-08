import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule as JwtModuleNest, JwtService } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModuleNest.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('jwt.secret'),
                signOptions: { expiresIn: config.get<string>('jwt.expiresIn') }
            }),
        }),
    ],
    providers: [JwtService]
})
export class JwtModule { }
