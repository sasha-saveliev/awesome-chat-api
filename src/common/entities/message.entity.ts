import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { MessageView } from './message-view.entity';
import { Room } from './room.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public authorId: number;

  @Column({ type: 'bigint' })
  public createdAt: number;

  @OneToMany(type => MessageView, messageView => messageView.message)
  public views: MessageView | [];

  @Column()
  public text: string;

  @ManyToOne(type => Room, room => room.messages)
  public room: Room;
}
