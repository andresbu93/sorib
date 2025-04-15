import { Currencies } from 'src/currencies/currencies.interface';
import { Movements } from 'src/movements/movements.interface';

export interface Accounts {
  id?: number;
  initialBalance: string;
  availableBalance: string;
  description: string;
  userId: string;
  movements: Movements[];
  currency: Partial<Currencies>;
}
