import { Users } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { MovementsType } from './movements.interface';
import { Accounts } from 'src/accounts/accounts.entity';
import { Currencies } from 'src/currencies/currencies.entity';

@Entity()
export class Movements {
  @PrimaryGeneratedColumn()
  id: number;

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

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Users, (user) => user.movements)
  user: Users;

  @ManyToOne(() => Accounts, (account) => account.movements)
  account: Accounts;

  @ManyToOne(() => Currencies, (currency) => currency.movements)
  currency: Currencies;
}
