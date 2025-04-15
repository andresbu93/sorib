import { Accounts } from 'src/accounts/accounts.interface';
import { Categories } from 'src/categories/categories.interface';
import { Currencies } from 'src/currencies/currencies.interface';

export enum MovementsType {
  INCOMING = 'incoming',
  OUTGOING = 'outgoing',
}

export interface Movements {
  id: number;
  description: string;
  amount: string;
  userId: string;
  type: MovementsType;
  account: Accounts;
  currency: Currencies;
  category: Categories;
}
