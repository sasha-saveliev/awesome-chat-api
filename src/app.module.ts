import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { SocketModule } from './socket/socket.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule,
    SocketModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
