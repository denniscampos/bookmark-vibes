import {
  recentBookmarks,
  totalUserBookmarks,
  userBookmarksThisMonth,
} from '@/lib/db/bookmarks/queries';
import { CategoryOverview } from './_components/CategoryOverview';
import { RecentBookmarks } from './_components/RecentBookmarks';
import { UserStatistics } from './_components/UserStatistics';
import { categoryOverview } from '@/lib/db/categories/queries';

export default async function Page() {
  const { data: bookmarks } = await recentBookmarks();
  const {
    data: categories,
    count: categoryCount,
    mostBookmarkedCategory,
  } = await categoryOverview();
  const { bookmarkCount } = await totalUserBookmarks();
  const { totalBookmarkCountForTheMonth } = await userBookmarksThisMonth();

  return (
    <div className="w-full p-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-lg sm:text-2xl">Dashboard</h2>
      </div>

      <div className="flex flex-wrap gap-5">
        <RecentBookmarks bookmarks={bookmarks} />
        <CategoryOverview
          categories={categories}
          categoryCount={categoryCount}
        />
        <UserStatistics
          bookmarkCount={bookmarkCount}
          totalBookmarkCountForTheMonth={totalBookmarkCountForTheMonth}
          mostBookmarkedCategory={mostBookmarkedCategory}
        />
      </div>
    </div>
  );
}
