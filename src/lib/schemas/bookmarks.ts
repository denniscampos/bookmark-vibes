import { z } from 'zod';

export const bookmarkSchema = z.object({
  url: z.string().url(),
  title: z.string(),
});

export type Bookmark = z.infer<typeof bookmarkSchema>;
