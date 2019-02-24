import { Module } from '@nestjs/common';

import { UsersGateway } from './gateways';

@Module({
  providers: [
    UsersGateway,
  ],
  exports: []
})
export class SocketModule {}
