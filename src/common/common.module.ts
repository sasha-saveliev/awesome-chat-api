import { Module } from '@nestjs/common';

import { TokenBlacklistRepository, UserRepository } from './repositories';
import { PasswordHashService, UserService } from './services';

@Module({
  providers: [
    PasswordHashService,
    UserService,

    UserRepository,
    TokenBlacklistRepository
  ],
  exports: [
    PasswordHashService,
    UserService,

    UserRepository,
    TokenBlacklistRepository
  ]
})
export class CommonModule {}
