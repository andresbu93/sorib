import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movements as MovementsEntity } from './movements.entity';
import { Movements } from './movements.interface';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class MovementsService {
  constructor(
    @InjectRepository(MovementsEntity)
    private readonly movementsRepository: Repository<Movements>,

    private readonly accountsService: AccountsService,
  ) {}

  async createOne(movement: Movements) {
    const movementToSave = this.movementsRepository.create(movement);

    const account = await this.accountsService.findById(
      movementToSave.account.id,
    );

    if (!account) {
      throw new Error('Account not found');
    }

    this.accountsService.update({
      ...account,
      availableBalance: String(
        Number(account.availableBalance) - Number(movement.amount),
      ),
    });

    await this.movementsRepository.save(movementToSave);
  }

  async createMany(movements: Movements[]): Promise<Movements[]> {
    const movementsToSave = this.movementsRepository.create(movements);
    return await this.movementsRepository.save(movementsToSave);
  }

  async findByExternalId(externalId: string): Promise<boolean> {
    const movement = await this.movementsRepository.findOneBy({ externalId });
    return movement ? true : false;
  }
}
