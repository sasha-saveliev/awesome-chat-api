import { MiddlewareConsumer, Module } from '@nestjs/common';

import { CommonModule } from '../../common/common.module';
import { AuthMiddleware } from '../auth/auth.middleware';
import { AuthModule } from '../auth/auth.module';
import { RoomsController } from './rooms.controller';

@Module({
  imports: [
    CommonModule,
    AuthModule
  ],
  controllers: [
    RoomsController
  ]
})
export class RoomsModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .with('RoomsModule')
      .forRoutes(RoomsController);
  }
}
