import { Users } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MovementsType } from './movements.interface';
import { Accounts } from 'src/accounts/accounts.entity';

@Entity()
export class Movements {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  externalId: string;

  @Column({
    type: 'enum',
    enum: MovementsType,
  })
  type: string;

  @Column()
  description: string;

  @Column({
    nullable: true,
  })
  category: string;

  @Column({ type: 'decimal', precision: 18, scale: 6 })
  amount: string;

  @Column()
  createdAt: string;

  @ManyToOne(() => Users, (user) => user.movements)
  user: Users;

  @ManyToOne(() => Accounts, (account) => account.movements)
  account: Accounts;
}
