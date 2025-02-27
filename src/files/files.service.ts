import { Injectable } from '@nestjs/common';
import { Movement } from '../movements/movement.interface';
import * as csv from 'csv-parser';
import { Readable } from 'stream';
import { MovementsService } from 'src/movements/movements.service';
import { CategoriesService } from 'src/concepts/categories.service';

@Injectable()
export class FilesService {
  constructor(
    private readonly movementsService: MovementsService,
    private readonly categoriesServices: CategoriesService,
  ) {}

  private processFile(file: string): Promise<Movement[]> {
    return new Promise((resolve, reject) => {
      const movements: Movement[] = [];
      const stream = Readable.from(file);

      const startIn = 12;
      let index = 0;

      const promises: Promise<void>[] = [];

      stream
        .pipe(
          csv({
            headers: false,
          }),
        )
        .on('data', async (row) => {
          if (index < startIn) {
            index++;
            return;
          }

          const createdAt = String(row[0]);
          const externalId = String(row[1]);
          const description = String(row[2]);
          const type = row[3] !== '' ? 'credit' : 'debit';
          const amount = String(row[3]) || String(row[4]);

          if (createdAt === 'undefined' || createdAt === '') {
            return;
          }

          const promise = this.movementsService
            .findByExternalId(externalId)
            .then((movementExist) => {
              if (!movementExist) {
                movements.push({
                  createdAt,
                  externalId,
                  description,
                  type,
                  amount,
                });
              }
            })
            .catch((error) => {
              console.error('Error checking movement:', error);
            });

          promises.push(promise);
        })
        .on('end', async () => {
          try {
            await Promise.all(promises);
            resolve(movements);
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error) => reject(error));
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<Movement[]> {
    const movements = await this.processFile(file.buffer.toString());

    const movementsWithCategory = [];

    for (const movement of movements) {
      const { category } = await this.categoriesServices.getCategory(movement);
      movementsWithCategory.push({ ...movement, category });
    }

    return this.movementsService.createMany(movementsWithCategory);
  }
}
