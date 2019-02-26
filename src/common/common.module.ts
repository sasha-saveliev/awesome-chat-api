import { Module } from '@nestjs/common';

import { RoomRepository, TokenBlacklistRepository, UserRepository } from './repositories';
import { PasswordHashService, UserService } from './services';
import { RoomService } from './services/room.service';

@Module({
  providers: [
    PasswordHashService,
    UserService,
    RoomService,

    UserRepository,
    TokenBlacklistRepository,
    RoomRepository
  ],
  exports: [
    PasswordHashService,
    UserService,
    RoomService,

    UserRepository,
    TokenBlacklistRepository,
    RoomRepository
  ]
})
export class CommonModule {}
