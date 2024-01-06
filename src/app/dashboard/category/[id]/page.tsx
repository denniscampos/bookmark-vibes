import { Card } from '@/components/ui/card';
import {
  getBookmarksByCategoryId,
  getCategoryById,
} from '@/lib/db/categories/queries';
import Link from 'next/link';
import { VerticalDropdownMenu } from '../../bookmarks/_components/VerticalDropdownMenu';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { data } = await getBookmarksByCategoryId({ categoryId: params.id });
  const { data: category } = await getCategoryById({ id: params.id });

  return (
    <div className="w-full p-8">
      <Card className="flex flex-col p-4 gap-2">
        <h2 className="text-xl font-bold text-muted-foreground">Category</h2>
        <p className="font-semibold text-2xl sm:text-4xl">
          {category?.[0].name}
        </p>
      </Card>

      <div className="flex flex-col gap-4 my-5">
        {data && data.length > 0 ? (
          data?.map((bookmark) => (
            <div
              key={bookmark.id}
              className="bg-card p-4 flex justify-between items-center"
            >
              <Link href={`${bookmark.url}`} className="w-full" target="_blank">
                <div>
                  <h3 className="font-semibold text-base sm:text-xl">
                    {bookmark.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm break-all">
                    {bookmark.url}
                  </p>
                </div>
              </Link>
              {/* <VerticalDropdownMenu
                bookmark={bookmark}
                categoryData={categoryData}
              /> */}
            </div>
          ))
        ) : (
          <div className="mt-5">
            <p className="text-sm text-muted-foreground">
              No bookmarks found for this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
