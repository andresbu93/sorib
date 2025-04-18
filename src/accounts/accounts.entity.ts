import { Currencies } from 'src/currencies/currencies.entity';
import { Movements } from 'src/movements/movements.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Accounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 18, scale: 6, default: 0 })
  initialBalance: string;

  @Column({ type: 'decimal', precision: 18, scale: 6 })
  availableBalance: string;

  @Column()
  description: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  userId: string;

  @OneToMany(() => Movements, (movement) => movement.account)
  movements: Movements[];

  @ManyToOne(() => Currencies, (currency) => currency.accounts)
  currency: Currencies;
}
