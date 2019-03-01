import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { AuthModule } from '../modules/auth/auth.module';
import { RoomsGateway, UsersGateway } from './gateways';
import { MessagesGateway } from './gateways/messages.gateway';

@Module({
  providers: [
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
