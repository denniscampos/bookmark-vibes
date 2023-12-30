'use client';

import { Button } from '@/components/ui/button';
import { createBookmark } from '@/lib/db/bookmarks/mutations';

interface BookmarkFormProps {
  handleBookmark: (formData: FormData) => Promise<void>;
}

export const BookmarkForm = ({ handleBookmark }: BookmarkFormProps) => {
  return (
    <div>
      <p>BookmarkForm</p>
      <form action={handleBookmark}>
        <input id="url" name="url" />
        <input id="title" name="title" />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
