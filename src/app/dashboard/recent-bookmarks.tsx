import { Card } from '@/components/ui/card';
import { RecentBookmarksPayload } from '@/lib/types';
import Link from 'next/link';

type RecentBookmarksProps = RecentBookmarksPayload;

export function RecentBookmarks({
  bookmarks,
}: {
  bookmarks: RecentBookmarksProps[] | undefined;
}) {
  return (
    <Card className="p-4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-sm sm:text-base">Recent Bookmarks</h2>
      </div>
      <div className="my-5 flex flex-col w-full gap-2">
        {bookmarks && bookmarks.length >= 1 ? (
          bookmarks.map((bookmark, index) => (
            <Link
              key={`bookmark-${index}`}
              className="text-sm text-muted-foreground hover:text-muted-foreground/60 flex items-center"
              href={`${bookmark.url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {bookmark.title}
            </Link>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No bookmarks yet</p>
        )}
      </div>
    </Card>
  );
}
