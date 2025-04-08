import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersController } from './users.controller';
import { Movements } from 'src/movements/movements.entity';
import { Accounts } from 'src/accounts/accounts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Movements, Accounts])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
