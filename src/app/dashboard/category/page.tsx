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
        {data && data.length >= 1 ? (
          data?.map((category) => (
            <Link
              key={category.id}
              className="flex gap-2 items-center border w-full md:w-[200px] p-4 md:w-49 hover:bg-muted"
              href={`/dashboard/category/${category.id}`}
            >
              <Folder className="w-4 h-4 text-green-500" />
              <h2 className="text-sm font-bold text-muted-foreground w-full">
                {category.name}
              </h2>
            </Link>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No categories found. Create one to get started!
          </p>
        )}
      </div>
    </div>
  );
}
