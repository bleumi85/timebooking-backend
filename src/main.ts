import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NODE_ENV } from './common/constants';
import { setupSwagger } from './utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('port');
  const CURRENT_NODE_ENV = configService.get<string>('node_env');

  if (CURRENT_NODE_ENV === NODE_ENV.DEVELOPMENT) {
    Logger.log('Setup', 'Swagger');
    setupSwagger(app);
  }

  await app.listen(PORT, () => {
    if (CURRENT_NODE_ENV === NODE_ENV.DEVELOPMENT) {
      Logger.log(`http://localhost:${PORT}`, `Web-${CURRENT_NODE_ENV}`);
    } else if (CURRENT_NODE_ENV === NODE_ENV.PRODUCTION) {
      Logger.log(
        `Application running on port ${PORT}`,
        `Web-${CURRENT_NODE_ENV}`,
      );
    } else {
      Logger.warn('Environment not found', 'Web');
    }
  });
}
bootstrap();
