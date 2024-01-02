import { Card } from '@/components/ui/card';

export function UserStatistics() {
  return (
    <Card className="p-8">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-sm sm:text-base">User Statistics</h2>
      </div>

      <div className="my-5 flex flex-col w-full">
        <p>Total Bookmarks</p>
        <p>Added This Month</p>
        <p>Most Bookmarked Category</p>
      </div>
    </Card>
  );
}
