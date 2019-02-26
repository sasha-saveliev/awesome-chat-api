import { Controller, Get, Req } from '@nestjs/common';
import { RoomService } from '../../common/services';

import { Room } from '../../common/entities/room.entity';

@Controller('rooms')
export class RoomsController {
  constructor(
    public readonly roomService: RoomService
  ) {}

  @Get()
  public findAll(@Req() req): Promise<Room[]> {
    const { id } = req.user;

    return this.roomService.findRoomsByUserId(id);
  }
}
