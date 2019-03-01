import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Room } from './room.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public authorId: number;

  @Column({ type: 'bigint' })
  public timestamp: number;

  @Column()
  public text: string;

  @ManyToOne(type => Room, room => room.messages)
  public room: Room;
}
