import { createBookmark } from '@/lib/db/bookmarks/mutations';
import { BookmarkForm } from './_components/BookmarkForm';

export default async function Page() {
  const handleBookmark = async (formData: FormData): Promise<void> => {
    'use server';

    const url = String(formData.get('url'));
    const title = String(formData.get('title'));
    await createBookmark({ url, title });
  };

  return (
    <div>
      <p>dashboard page</p>
      <BookmarkForm handleBookmark={handleBookmark} />
    </div>
  );
}
