import { Controller, Post, UseGuards, Request } from '@nestjs/common';
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
    movement.account = {
      id: req.body.accountId,
    };
    return this.movementsService.createOne(movement);
  }
}
