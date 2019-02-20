import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TokenBlacklist {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'varchar'
  })
  public token: string;
}
