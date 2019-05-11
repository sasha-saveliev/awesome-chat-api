import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { AuthModule } from '../modules/auth/auth.module';
import { ConnectionGateway, MessagesGateway, RoomsGateway, UsersGateway } from './gateways';
import { ConnectionService, UserSocketService } from './services';

@Module({
  providers: [
    ConnectionService,
    UserSocketService,

    ConnectionGateway,
    UsersGateway,
    RoomsGateway,
    MessagesGateway
  ],
  imports: [
    CommonModule,
    AuthModule
  ],
  exports: [
    ConnectionService,
    UserSocketService
  ]
})
export class SocketModule {}
