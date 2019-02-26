import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';

import { Room } from '../entities/room.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class RoomRepository {
  private readonly repository: Repository<Room> = getRepository(Room);

  public async createAndSave(participants: User[]): Promise<Room> {
    return this.repository.save({ participants });
  }
}
