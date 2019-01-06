import { INestApplication, INestExpressApplication, Injectable } from '@nestjs/common';
import * as socketIo from 'socket.io';

// TODO: Move APP_PORT to config with ENV variables
const APP_PORT = 8080;

@Injectable()
export class SocketService {
  public initialize(app: INestApplication & INestExpressApplication) {
    const io = socketIo(app);

    io.on('connect', (socket: any) => {
      console.warn('Connected client on port %s.', APP_PORT);
      socket.on('message', (message: string) => {
          console.warn('[server](message): %s', JSON.stringify(message));
          io.emit('message', message);
      });

      socket.on('disconnect', () => {
          console.warn('Client disconnected');
      });
  });
  }
}
