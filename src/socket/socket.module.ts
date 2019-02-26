import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { RoomsGateway, UsersGateway } from './gateways';

@Module({
  providers: [
    UsersGateway,
    RoomsGateway
  ],
  imports: [
    CommonModule
  ],
  exports: []
})
export class SocketModule {}
