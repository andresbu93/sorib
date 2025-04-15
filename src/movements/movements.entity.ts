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
import { Categories } from 'src/categories/categories.entity';

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

  @Column({ type: 'decimal', precision: 18, scale: 6 })
  amount: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => Accounts, (account) => account.movements)
  account: Accounts;

  @ManyToOne(() => Currencies, (currency) => currency.movements)
  currency: Currencies;

  @ManyToOne(() => Categories, (category) => category.movements)
  category: Categories;
}
