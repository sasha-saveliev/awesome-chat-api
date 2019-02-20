import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CommonModule } from '../../common/common.module';

import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { AuthService } from './services';

@Module({
  imports: [
    // TODO: Move secret key to config with ENV variables
    JwtModule.register({ secretOrPrivateKey: 'secret' }),
    CommonModule
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .with('AuthModule')
      .forRoutes({
        path: 'auth/logout',
        method: RequestMethod.POST
      });
  }
}
