import { MikroORM } from '@mikro-orm/core';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { NODE_ENV } from './common/constants';

@Module({
  imports: [ConfigModule, MikroOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule, OnModuleInit, OnModuleDestroy {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit() {
    if (process.env.NODE_ENV === NODE_ENV.DEVELOPMENT) {
      await this.orm.getMigrator().up();
    } else {
      await this.orm.connect();
    }
  }

  async onModuleDestroy() {
    await this.orm.close();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}
