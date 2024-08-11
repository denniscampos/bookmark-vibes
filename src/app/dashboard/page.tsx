import { Suspense } from 'react';
import { RecentBookmarks } from './recent-bookmarks';
import { CategoryOverview } from './category-overview';
import { UserStatistics } from './user-statistics';
import {
  recentBookmarks,
  totalUserBookmarks,
  userBookmarksThisMonth,
} from '@/lib/db/bookmarks/queries';
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
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>

      <div className="flex flex-1" x-chunk="dashboard-02-chunk-1">
        <div className="w-full p-2 md:p-8">
          <div className="flex gap-5 flex-wrap lg:flex-nowrap">
            <Suspense fallback={<div>Loading...</div>}>
              <RecentBookmarks bookmarks={bookmarks} />
            </Suspense>

            <Suspense fallback={<div>Loading...</div>}>
              <CategoryOverview
                categories={categories}
                categoryCount={categoryCount}
              />
            </Suspense>

            <Suspense fallback={<div>Loading...</div>}>
              <UserStatistics
                bookmarkCount={bookmarkCount}
                totalBookmarkCountForTheMonth={totalBookmarkCountForTheMonth}
                mostBookmarkedCategory={mostBookmarkedCategory}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
