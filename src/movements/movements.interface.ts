import { Accounts } from 'src/accounts/accounts.interface';
import { Currencies } from 'src/currencies/currencies.interface';
import { Users } from 'src/users/users.interface';

export enum MovementsType {
  INCOMING = 'incoming',
  OUTGOING = 'outgoing',
}

export interface Movements {
  id: number;
  externalId: string;
  type: MovementsType;
  description: string;
  category?: string;
  amount: string;
  user: Partial<Users>;
  account: Partial<Accounts>;
  currency: Currencies;
}
