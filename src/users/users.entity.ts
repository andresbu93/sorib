import { Accounts } from 'src/accounts/accounts.entity';
import { Movements } from 'src/movements/movements.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Movements, (movement) => movement.user)
  movements: Movements[];

  @OneToMany(() => Accounts, (account) => account.user)
  accounts: Accounts[];

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
