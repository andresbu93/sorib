import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories as CategoriesEntity } from './categories.entity';
import { Repository } from 'typeorm';
import { Categories } from './categories.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
  ) {}

  findAll() {
    return this.categoriesRepository.find();
  }

  async create(category: Categories) {
    const categoryToSave = this.categoriesRepository.create(category);
    return await this.categoriesRepository.save(categoryToSave);
  }

  async update(category: Categories) {
    const categoryToUpdate = await this.categoriesRepository.findOneBy({
      id: category.id,
    });
    return await this.categoriesRepository.update(category.id, {
      ...categoryToUpdate,
      ...category,
    });
  }

  remove(id: number) {
    return this.categoriesRepository.delete({ id });
  }
}
