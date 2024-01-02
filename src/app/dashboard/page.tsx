import { recentBookmarks } from '@/lib/db/bookmarks/queries';
import { CategoryOverview } from './_components/CategoryOverview';
import { RecentBookmarks } from './_components/RecentBookmarks';
import { UserStatistics } from './_components/UserStatistics';
import { categoryOverview } from '@/lib/db/categories/queries';

export default async function Page() {
  const { data: bookmarks } = await recentBookmarks();
  const { data: categories, count: categoryCount } = await categoryOverview();

  return (
    <div className="w-full p-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-lg sm:text-2xl">Dashboard</h2>
      </div>

      <div className="flex flex-wrap gap-5 justify-between">
        <RecentBookmarks bookmarks={bookmarks} />
        <CategoryOverview
          categories={categories}
          categoryCount={categoryCount}
        />
        <UserStatistics />
      </div>
    </div>
  );
}
