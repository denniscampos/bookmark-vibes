import { z } from 'zod';

export const bookmarkSchema = z.object({
  url: z.string().url({ message: 'Invalid URL' }),
  title: z.string().min(1, { message: 'Title required' }),
  category_id: z.string(),
  category_name: z.string().min(1, { message: 'Category name required' }),
});

export type Bookmark = z.infer<typeof bookmarkSchema>;
