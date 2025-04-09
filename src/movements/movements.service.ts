import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movements as MovementsEntity } from './movements.entity';
import { Movements, MovementsType } from './movements.interface';
import { AccountsService } from 'src/accounts/accounts.service';
import { Accounts } from 'src/accounts/accounts.interface';

@Injectable()
export class MovementsService {
  constructor(
    @InjectRepository(MovementsEntity)
    private readonly movementsRepository: Repository<Movements>,

    private readonly accountsService: AccountsService,
  ) {}

  private getAmount(amount: string, type: string) {
    switch (type) {
      case MovementsType.INCOMING:
        return amount;
      case MovementsType.OUTGOING:
        return `-${amount}`;
    }
  }

  async createOne(movement: Movements) {
    movement.amount = this.getAmount(movement.amount, movement.type);
    const movementToSave = this.movementsRepository.create(movement);

    const account = (await this.accountsService.findById(
      movementToSave.account.id,
    )) as unknown as Accounts;

    if (!account) {
      throw new Error('Account not found');
    }

    await this.accountsService.update({
      ...account,
      availableBalance: String(
        Number(account.availableBalance) + Number(movement.amount),
      ),
    });

    await this.movementsRepository.save(movementToSave);
  }

  // remove ??
  async createMany(movements: Movements[]): Promise<Movements[]> {
    const movementsToSave = this.movementsRepository.create(movements);
    return await this.movementsRepository.save(movementsToSave);
  }

  // remove ??
  async findByExternalId(externalId: string): Promise<boolean> {
    const movement = await this.movementsRepository.findOneBy({ externalId });
    return movement ? true : false;
  }

  async update(movement: Movements) {
    movement.amount = this.getAmount(movement.amount, movement.type);
    const movementToUpdate = await this.movementsRepository.findOneBy({
      id: movement.id,
    });
    return await this.movementsRepository.update(movement.id, {
      ...movementToUpdate,
      ...movement,
    });
  }

  async delete(id: number) {
    const movement = (
      await this.movementsRepository.find({
        where: {
          id,
        },
        relations: {
          account: true,
        },
      })
    )[0];

    if (!movement) {
      throw new Error('Movement not found');
    }

    const account = await this.accountsService.findById(movement.account.id);

    if (!account) {
      throw new Error('Account not found');
    }

    account.availableBalance = String(
      Number(account.availableBalance) + Number(movement.amount),
    );

    await this.accountsService.update({
      id: account.id,
      availableBalance: account.availableBalance,
    });

    return this.movementsRepository.delete({ id });
  }
}
