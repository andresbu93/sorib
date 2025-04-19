import { Categories } from 'src/categories/categories.interface';
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

export interface Transfer {
  userId: string;
  from: Accounts;
  to: Accounts;
  amount: string;
  description: string;
  exchangeRate: string;
  category: Categories;
}
