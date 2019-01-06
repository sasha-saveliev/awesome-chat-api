import { INestApplication, INestExpressApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { createConnection } from 'typeorm';

import { AppModule } from './app.module';
import { SocketService } from './socket/services';

// TODO: Move APP_PORT to config with ENV variables
const APP_PORT = 8080;

async function bootstrap() {
  createConnection()
    .then(async () => {
      const app: INestApplication & INestExpressApplication = await NestFactory.create(AppModule);
      app.useGlobalPipes(new ValidationPipe());

      const server: INestApplication & INestExpressApplication = await app.listen(APP_PORT);
      const socketService: SocketService = app.get(SocketService);

      socketService.initialize(server);
    });
}

bootstrap();
