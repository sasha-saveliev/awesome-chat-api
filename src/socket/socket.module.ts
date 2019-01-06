import { Module } from '@nestjs/common';

import { SocketService } from './services';

@Module({
  providers: [SocketService],
  exports: [SocketService]
})
export class SocketModule {}
