import { Module } from '@nestjs/common';

import {
  MessageRepository,
  MessageViewRepository,
  RoomRepository,
  TokenBlacklistRepository,
  UserRepository
} from './repositories';
import { MessageService, PasswordHashService, UserService } from './services';
import { RoomService } from './services/room.service';

@Module({
  providers: [
    PasswordHashService,
    UserService,
    RoomService,
    MessageService,

    UserRepository,
    TokenBlacklistRepository,
    RoomRepository,
    MessageRepository,
    MessageViewRepository
  ],
  exports: [
    PasswordHashService,
    UserService,
    RoomService,
    MessageService,

    UserRepository,
    TokenBlacklistRepository,
    RoomRepository,
    MessageRepository
  ]
})
export class CommonModule {}
