import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Message } from './message.entity';

@Entity()
export class MessageView {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'bigint' })
  public seenAt: number;

  @Column()
  public seenBy: number;

  @Column()
  public roomId: number;

  @Column({ type: 'int', nullable: true })
  public messageId: number;

  @ManyToOne(type => Message, message => message.views)
  @JoinColumn({ name: 'messageId' })
  public message: Message;
}
