import { CategoryPayloadType } from '@/lib/types';
import { BookmarkForm } from './_components/BookmarkForm';
import { getCategories } from '@/lib/db/categories/queries';

export default async function Page() {
  const { data } = (await getCategories()) as CategoryPayloadType;

  return (
    <div className="w-full p-8">
      <BookmarkForm categories={data} />
    </div>
  );
}
