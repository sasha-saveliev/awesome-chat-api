import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { AuthModule } from '../modules/auth/auth.module';
import { ConnectionGateway, MessagesGateway, RoomsGateway, UsersGateway } from './gateways';
import { ConnectionService } from './services';

@Module({
  providers: [
    ConnectionService,
    ConnectionGateway,
    UsersGateway,
    RoomsGateway,
    MessagesGateway
  ],
  imports: [
    CommonModule,
    AuthModule
  ],
  exports: []
})
export class SocketModule {}
