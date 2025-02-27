import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movements } from './movements.entity';
import { Movement } from './movement.interface';

@Injectable()
export class MovementsService {
  constructor(
    @InjectRepository(Movements)
    private movementsRepository: Repository<Movements>,
  ) {}

  async createMany(movements: Movement[]): Promise<Movements[]> {
    const movementsToSave = this.movementsRepository.create(movements);
    return await this.movementsRepository.save(movementsToSave);
  }

  async findByExternalId(externalId: string): Promise<boolean> {
    const movement = await this.movementsRepository.findOneBy({ externalId });
    return movement ? true : false;
  }
}
