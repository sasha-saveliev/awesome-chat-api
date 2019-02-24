import { INestApplication, INestExpressApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { createConnection } from 'typeorm';

import { AppModule } from './app.module';

// TODO: Move APP_PORT to config with ENV variables
const APP_PORT = 8080;

async function bootstrap() {
  createConnection()
    .then(async () => {
      const app: INestApplication & INestExpressApplication = await NestFactory.create(AppModule);

      app.useGlobalPipes(new ValidationPipe());
      app.enableCors();

      await app.listen(APP_PORT);
    });
}

bootstrap();
