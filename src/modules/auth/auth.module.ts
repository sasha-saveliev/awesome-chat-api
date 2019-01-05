import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CommonModule } from '../../common/common.module';
import { AuthController } from './auth.controller';
import { AuthService } from './services';

@Module({
  imports: [
    // TODO: Move secret key to config with ENV variables
    JwtModule.register({ secretOrPrivateKey: 'secret' }),
    CommonModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService
  ]
})
export class AuthModule {}
