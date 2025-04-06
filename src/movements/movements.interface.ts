import { Accounts } from 'src/accounts/accounts.interface';
import { Users } from 'src/users/users.interface';

export enum MovementsType {
  INCOMING = 'incoming',
  OUTGOING = 'outgoing',
}

export interface Movements {
  externalId: string;
  type: MovementsType;
  description: string;
  category?: string;
  amount: string;
  user: Partial<Users>;
  account: Partial<Accounts>;
}
