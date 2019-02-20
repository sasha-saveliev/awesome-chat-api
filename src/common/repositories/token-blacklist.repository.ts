import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';

import { TokenBlacklist } from '../entities/token-blacklist.entity';

@Injectable()
export class TokenBlacklistRepository {
  private readonly repository: Repository<TokenBlacklist> = getRepository(TokenBlacklist);

  public add(token: string): Promise<TokenBlacklist> {
    return this.repository.save({ token });
  }

  public async isBlacklisted(token: string): Promise<boolean> {
    return Boolean(await this.repository.count({ token }));
  }
}
