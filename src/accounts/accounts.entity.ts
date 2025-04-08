import { Movements } from 'src/movements/movements.entity';
import { Users } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  DeleteDateColumn,
  UpdateDateColumn,
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

  @Column()
  currencyCode: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Users, (user) => user.accounts)
  user: Users;

  @OneToMany(() => Movements, (movement) => movement.account)
  movements: Movements[];
}
