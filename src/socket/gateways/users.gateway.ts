
import {
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';

@WebSocketGateway()
export class UsersGateway {
  @WebSocketServer() public server: SocketIO.Server;
}
