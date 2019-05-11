import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { CommonModule } from '../../common/common.module';
import { SocketModule } from '../../socket/socket.module';
import { AuthModule } from '../auth/auth.module';

import { AuthMiddleware } from '../auth/auth.middleware';
import { UsersController } from './users.controller';

const AUTH_PROTECTED_ROUTES = [{
    path: 'users',
    method: RequestMethod.GET
  }, {
    path: 'users/current',
    method: RequestMethod.GET
  }, {
    path: 'users/online',
    method: RequestMethod.GET
  }];

@Module({
  imports: [
    CommonModule,
    AuthModule,
    SocketModule
  ],
  controllers: [
    UsersController
  ]
})
export class UsersModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .with('UsersModule')
      .forRoutes(...AUTH_PROTECTED_ROUTES);
  }
}
