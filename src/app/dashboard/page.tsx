import { getCategories } from '@/lib/db/categories/queries';
import { BookmarkForm } from './_components/BookmarkForm';
import { CategoryPayloadType } from '@/lib/types';

export default async function Page() {
  const { data } = (await getCategories()) as CategoryPayloadType;

  return (
    <div className="w-full p-8">
      <p>dashboard page</p>
      <BookmarkForm categories={data} />
    </div>
  );
}
