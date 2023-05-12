import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NODE_ENV } from './common/constants';
import { setupSwagger } from './utils';
import * as cookieParser from 'cookie-parser';

var whiteList = [
  'https://jbldev.netlify.app'
];

var regexList = [
  /localhost:\d+$/
];

async function bootstrap() {
  const isDevelopment = process.env.NODE_ENV === NODE_ENV.DEVELOPMENT
  const app = await NestFactory.create(AppModule, {
    logger: isDevelopment ? ['debug', 'error', 'log', 'verbose', 'warn'] : ['error', 'warn']
  });

  app.enableCors({
    credentials: true,
    origin: function(origin, callback) {
      if (origin === undefined) {
        Logger.log('no origin', 'CORS');
        callback(null, true);
      } else if (whiteList.indexOf(origin) !== -1) {
        Logger.log(origin, 'CORS-Whitelist');
        callback(null, true);
      } else if (regexList.some((regex) => regex.test(origin))) {
        Logger.log(origin, 'CORS-Regex');
        callback(null, true);
      } else {
        Logger.warn(origin, 'CORS-NotAllowed');
        callback(new Error('Not allowed by CORS'))
      }
    }
  })

  app.use(cookieParser());
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
