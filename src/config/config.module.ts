import { Module } from '@nestjs/common';
import { ConfigModule as ConfigModuleNest } from '@nestjs/config';
import { configuration } from './configuration';
import { validationSchema } from './validation';

@Module({
  imports: [
    ConfigModuleNest.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development', '.env.development.local'],
      load: [configuration],
      validationSchema,
    }),
  ],
})
export class ConfigModule {}
