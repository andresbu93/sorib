import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { Injectable } from '@nestjs/common';
import { Movement } from 'src/movements/movement.interface';
import { Categories } from './category.interface';
import { itemSchema } from './category.schema';

@Injectable()
export class CategoriesService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey:
        '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',
    });
  }

  async getCategory(movement: Partial<Movement>): Promise<Partial<Movement>> {
    const movementDescriptions = `${movement.description} ${movement.amount}`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'developer',
          content:
            'You are a helpful assistant that categorizes transactions into categories based on their description.',
        },
        {
          role: 'user',
          content: `I have a list of transactions with their description amount and his external id. Please categorize each transaction based on its description. The categories are: ${Object.values(Categories)}. Here is the list of transactions: ${movementDescriptions}`,
        },
      ],
      response_format: zodResponseFormat(itemSchema, 'category_response'),
    });
    console.info(response.choices[0].message.content);
    return JSON.parse(response.choices[0].message.content);
  }
}
