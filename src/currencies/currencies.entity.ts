import { Accounts } from 'src/accounts/accounts.entity';
import { Movements } from 'src/movements/movements.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Currencies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  code: string;

  @OneToMany(() => Movements, (movement) => movement.currency)
  movements: Movements[];

  @OneToMany(() => Accounts, (account) => account.currency)
  accounts: Accounts[];
}
