import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

type UserStatisticsProps = {
  bookmarkCount: number | null | undefined;
  totalBookmarkCountForTheMonth: number | null | undefined;
  mostBookmarkedCategory: string | undefined;
};

export function UserStatistics({
  bookmarkCount,
  totalBookmarkCountForTheMonth,
  mostBookmarkedCategory,
}: UserStatisticsProps) {
  return (
    <Card className="p-4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-sm sm:text-base">User Statistics</h2>
      </div>

      <div className="my-5 flex flex-col gap-2 w-full text-sm text-muted-foreground">
        <div className="flex justify-between">
          <span>Total Bookmarks</span>
          <Badge>{bookmarkCount}</Badge>
        </div>

        <div className="flex justify-between">
          <span>Added This Month</span>
          <Badge>{totalBookmarkCountForTheMonth}</Badge>
        </div>

        <div className="flex justify-between">
          <span>Most Bookmarked Category</span>
          {mostBookmarkedCategory ? (
            <Badge>{mostBookmarkedCategory}</Badge>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
