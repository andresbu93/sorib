import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movements as MovementsEntity } from './movements.entity';
import { Movements, MovementsType } from './movements.interface';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class MovementsService {
  constructor(
    @Inject(forwardRef(() => AccountsService))
    private readonly accountsService: AccountsService,

    @InjectRepository(MovementsEntity)
    private readonly movementsRepository: Repository<Movements>,
  ) {}

  private getAmount(amount: string, type: string) {
    switch (type) {
      case MovementsType.INCOMING:
        return amount;
      case MovementsType.OUTGOING:
        return `${Number(amount) * -1}`;
    }
  }

  async createOne(movement: Movements) {
    movement.amount = this.getAmount(movement.amount, movement.type);

    await this.accountsService.updateBalance(
      movement.account.id,
      Number(movement.amount),
    );

    const movementToSave = this.movementsRepository.create(movement);
    return await this.movementsRepository.save(movementToSave);
  }

  async update(movement: Movements) {
    console.log(movement);
    movement.amount = this.getAmount(movement.amount, movement.type);

    console.log(movement.amount);

    await this.accountsService.updateBalance(
      movement.account.id,
      Number(movement.amount),
    );

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
