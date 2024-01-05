import { Button } from '@/components/ui/button';

import { getUserBookmarks } from '@/lib/db/bookmarks/queries';
import Link from 'next/link';
import { VerticalDropdownMenu } from './_components/VerticalDropdownMenu';
import { getCategories } from '@/lib/db/categories/queries';
import { CategoryPayloadType } from '@/lib/types';
import { Pagination } from '@/components/Pagination';

type PageProps = {
  searchParams: {
    page: number;
  };
};

export default async function Page({ searchParams: { page = 1 } }: PageProps) {
  const { data, totalCount, itemsPerPage } = await getUserBookmarks(page);
  const { data: categoryData } = (await getCategories()) as CategoryPayloadType;

  return (
    <div className="w-full p-8">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg sm:text-2xl">My Bookmarks</h2>
        <Button size="sm" asChild>
          <Link href="/dashboard/bookmarks/create">Add Bookmark</Link>
        </Button>
      </div>

      <div className="my-5 flex flex-col w-full gap-4">
        {data && data.length > 0 ? (
          data.map((bookmark) => (
            <div
              key={bookmark.id}
              className="bg-card p-4 flex justify-between items-center"
            >
              <Link href={`${bookmark.url}`} className="w-full" target="_blank">
                <div>
                  <h3 className="font-semibold text-xl">{bookmark.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {bookmark.url}
                  </p>
                </div>
              </Link>
              <VerticalDropdownMenu
                bookmark={bookmark}
                categoryData={categoryData}
              />
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No bookmarks yet</p>
        )}
      </div>
      <Pagination
        page={page}
        totalCount={totalCount}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
