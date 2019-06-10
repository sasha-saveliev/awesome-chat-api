import { Module } from '@nestjs/common';

import {
  MessageRepository,
  MessageViewRepository,
  RoomRepository,
  TokenBlacklistRepository,
  UserRepository
} from './repositories';
import { MessageService, PasswordHashService, UserService } from './services';
import { AvatarService } from './services/avatar.service';
import { RoomService } from './services/room.service';

@Module({
  providers: [
    PasswordHashService,
    UserService,
    RoomService,
    MessageService,
    AvatarService,

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
    AvatarService,

    UserRepository,
    TokenBlacklistRepository,
    RoomRepository,
    MessageRepository
  ]
})
export class CommonModule {}
