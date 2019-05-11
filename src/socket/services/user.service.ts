import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { User } from '../../common/entities/user.entity';
import { UserEvents } from '../events';

@WebSocketGateway()
@Injectable()
export class UserSocketService {
  @WebSocketServer() public server: SocketIO.Server;

  public notifyAboutNewUser(newUser: User) {
    this.server.sockets
      .emit(UserEvents.NewUser, newUser);
  }
}
