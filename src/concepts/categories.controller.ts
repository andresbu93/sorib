import { Body, Controller, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Movement } from 'src/movements/movement.interface';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesServices: CategoriesService) {}

  @Post()
  categoriesByDescriptions(@Body() movement: Partial<Movement>) {
    return this.categoriesServices.getCategory(movement);
  }
}
