import { Injectable } from '@nestjs/common';
import { Users } from './users.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Users as UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { Movements } from 'src/movements/movements.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<Users>,
    @InjectRepository(Movements)
    private movementsRepository: Repository<Movements>,
  ) {}

  async findOne(username: string): Promise<Users | undefined> {
    return await this.usersRepository.findOne({ where: { username } });
  }

  getMovementsByUser(userId: number) {
    return this.movementsRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }
}
