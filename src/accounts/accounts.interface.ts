import { Movements } from 'src/movements/movements.interface';
import { Users } from 'src/users/users.interface';

export interface Accounts {
  id?: number;
  initialBalance: string;
  availableBalance: string;
  description: string;
  currency: string;
  user: Partial<Users>;
  movements: Movements[];
}
