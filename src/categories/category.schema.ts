import { z } from 'zod';

export const itemSchema = z.object({
  category: z.string(),
});
