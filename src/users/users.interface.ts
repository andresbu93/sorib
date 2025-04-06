import { Accounts } from 'src/accounts/accounts.interface';
import { Movements } from 'src/movements/movements.interface';

export interface Users {
  id: number;
  username: string;
  password: string;
  accounts: Accounts[];
  movements: Movements[];
}
