import { Module } from '@nestjs/common';

import { UserRepository } from './repositories';
import { PasswordHashService, UserService } from './services';

@Module({
  providers: [
    PasswordHashService,
    UserService,
    UserRepository
  ],
  exports: [
    PasswordHashService,
    UserService,
    UserRepository
  ]
})
export class CommonModule {}
