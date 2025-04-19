import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts as AccountsEntity } from './accounts.entity';
import { Accounts, Transfer } from './accounts.interface';
import { Repository } from 'typeorm';
import { MovementsService } from 'src/movements/movements.service';
import { Movements, MovementsType } from 'src/movements/movements.interface';

@Injectable()
export class AccountsService {
  constructor(
    @Inject(forwardRef(() => MovementsService))
    private readonly movementsService: MovementsService,

    @InjectRepository(AccountsEntity)
    private readonly accountsRepository: Repository<AccountsEntity>,
  ) {}

  findById(id: number): Promise<AccountsEntity> {
    return this.accountsRepository.findOne({ where: { id } });
  }

  async createOne(account: Accounts) {
    const accountToSave = this.accountsRepository.create(account as any);
    return await this.accountsRepository.save(accountToSave);
  }

  async update(account: Partial<Accounts>) {
    const accountToUpdate = await this.accountsRepository.findOne({
      where: { id: account.id },
    });
    return await this.accountsRepository.update(account.id, {
      ...accountToUpdate,
      ...account,
    });
  }

  async delete(id: number) {
    return this.accountsRepository.softDelete({ id });
  }

  async updateBalance(id: number, amount: number) {
    const account = await this.findById(id);

    if (!account) {
      throw new Error('Account not found');
    }

    console.log(
      account.description,
      amount,
      String(Number(account.availableBalance) + amount),
    );
    await this.accountsRepository.update(id, {
      availableBalance: String(Number(account.availableBalance) + amount),
    });
  }

  async transfer(transfer: Transfer) {
    const { from, to, amount, description, exchangeRate, category, userId } =
      transfer;

    if (from === to) {
      throw new Error('Cannot transfer to the same account');
    }

    const fromAmount = Number(amount) * -1;
    const toAmount = exchangeRate
      ? Number(amount) * Number(exchangeRate)
      : Number(amount);

    console.log(toAmount);
    const movementFrom: Movements = {
      userId,
      category,
      account: from,
      amount,
      description,
      type: MovementsType.OUTGOING,
    };
    const movementTo: Movements = {
      userId,
      category,
      account: to,
      amount,
      description,
      type: MovementsType.INCOMING,
    };

    try {
      Promise.all([
        this.updateBalance(from.id, fromAmount),
        this.updateBalance(to.id, toAmount),
        this.movementsService.createOne(movementFrom),
        this.movementsService.createOne(movementTo),
      ]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
