import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts as AccountsEntity } from './accounts.entity';
import { Accounts } from './accounts.interface';
import { Repository } from 'typeorm';

@Injectable()
export class AccountsService {
  constructor(
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
}
