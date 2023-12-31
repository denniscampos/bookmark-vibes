import { Button } from '@/components/ui/button';

import { getUserBookmarks } from '@/lib/db/bookmarks/queries';
import Link from 'next/link';
import { VerticalDropdownMenu } from './_components/VerticalDropdownMenu';

export default async function Page() {
  const { data } = await getUserBookmarks();

  return (
    <div className="w-full p-8">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl">My Bookmarks</h2>
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
              <div>
                <h3 className="font-semibold text-xl">{bookmark.title}</h3>
                <p className="text-muted-foreground text-sm">{bookmark.url}</p>
              </div>
              <VerticalDropdownMenu bookmark={bookmark} />
            </div>
          ))
        ) : (
          <p>No bookmarks yet</p>
        )}
      </div>
    </div>
  );
}
