import {
  Controller,
  Post,
  UseGuards,
  Request,
  Patch,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { MovementsService } from './movements.service';
import { Movements } from './movements.interface';
import { CustomAuthGuard } from 'src/auth/custom-auth.guard';

@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @UseGuards(CustomAuthGuard)
  @Post()
  createOne(@Request() req) {
    const movement = req.body as unknown as Movements;
    movement.userId = req.user.userId;
    return this.movementsService.createOne(movement);
  }

  @UseGuards(CustomAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() movement) {
    return this.movementsService.update({
      ...movement,
      id,
    });
  }

  @UseGuards(CustomAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.movementsService.delete(id);
  }
}
