import { CategoryDialog } from '@/components/CategoryDialog';
import { getUserCategories } from '@/lib/db/categories/queries';
import { Folder } from 'lucide-react';
import Link from 'next/link';

export default async function Page() {
  const { data } = await getUserCategories();

  return (
    <div className="w-full p-8">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg sm:text-2xl">My Categories</h2>
        <CategoryDialog dialogDescription="Add a new category for your bookmarks" />
      </div>

      <div className="w-full flex flex-wrap gap-4 my-5">
        {data?.map((category) => (
          <div
            key={category.id}
            className="border p-4 w-full md:w-48 hover:bg-muted"
          >
            <Link
              className="flex gap-2 items-center"
              href={`/dashboard/category/${category.id}`}
            >
              <Folder className="w-4 h-4 text-green-500" />
              <h2 className="text-sm font-bold text-muted-foreground w-full">
                {category.name}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
