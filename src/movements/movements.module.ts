import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movements } from './movements.entity';
import { MovementsService } from './movements.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movements])],
  providers: [MovementsService],
  exports: [MovementsService],
})
export class MovementsModule {}
