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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createOne(@Request() req) {
    const movement = req.body as unknown as Movements;
    movement.user = {
      id: req.user.userId,
    };
    return this.movementsService.createOne(movement);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() movement) {
    return this.movementsService.update({
      ...movement,
      id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.movementsService.delete(id);
  }
}
