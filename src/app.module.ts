import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { UsersModule } from './modules/users/users.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    AuthModule,
    SocketModule,
    UsersModule,
    RoomsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
