import {
  recentBookmarks,
  totalUserBookmarks,
  userBookmarksThisMonth,
} from '@/lib/db/bookmarks/queries';
import { CategoryOverview } from './_components/CategoryOverview';
import { RecentBookmarks } from './_components/RecentBookmarks';
import { UserStatistics } from './_components/UserStatistics';
import { categoryOverview } from '@/lib/db/categories/queries';
import { protectedRoutes } from '@/utils/protectedRoutes';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page() {
  const user = await protectedRoutes();

  if (!user) {
    redirect('/login');
  }

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
  );
}
