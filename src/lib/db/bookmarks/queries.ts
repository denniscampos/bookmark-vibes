'use server';

import { initializeAndAuthenticateUser } from '@/utils/initializeAndAuthenticateUser';

export async function getUserBookmarks(page: number) {
  const initResult = await initializeAndAuthenticateUser();
  const { user, supabase } = initResult;

  if (initResult.error || !user) {
    return {
      error: initResult.error,
    };
  }
  const itemsPerPage = 5;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage - 1;

  const { data, error, count } = await supabase
    .from('bookmark')
    .select('id, url, title, category_id, category_name', { count: 'exact' })
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .range(start, end);

  if (error) {
    return {
      error: 'There was an error fetching your bookmarks',
    };
  }

  return {
    data,
    totalCount: count,
    itemsPerPage,
  };
}

export async function recentBookmarks() {
  const initResult = await initializeAndAuthenticateUser();
  const { user, supabase } = initResult;

  if (initResult.error || !user) {
    return {
      error: initResult.error,
    };
  }

  const { data, error } = await supabase
    .from('bookmark')
    .select('title, url')
    .order('created_at', { ascending: false })
    .limit(5)
    .match({ user_id: user.id });

  if (error) {
    return {
      error: 'There was an error fetching your categories',
    };
  }

  return {
    data,
  };
}

export async function totalUserBookmarks() {
  const initResult = await initializeAndAuthenticateUser();
  const { user, supabase } = initResult;

  if (initResult.error || !user) {
    return {
      error: initResult.error,
    };
  }

  const { error, count } = await supabase
    .from('bookmark')
    .select('id', { count: 'exact' })
    .eq('user_id', user.id);

  if (error) {
    return {
      error: 'There was an error fetching your bookmarks',
    };
  }

  return {
    bookmarkCount: count,
  };
}

export async function userBookmarksThisMonth() {
  const initResult = await initializeAndAuthenticateUser();
  const { user, supabase } = initResult;

  if (initResult.error || !user) {
    return {
      error: initResult.error,
    };
  }

  const firstDayOfMonth = new Date();
  firstDayOfMonth.setDate(1);
  firstDayOfMonth.setHours(0, 0, 0, 0);

  const firstDayOfMonthFormatted = firstDayOfMonth.toISOString().split('T')[0];

  const { error, count } = await supabase
    .from('bookmark')
    .select('id', { count: 'exact' })
    .eq('user_id', user.id)
    .gt('created_at', firstDayOfMonthFormatted);

  if (error) {
    return {
      error: 'There was an error fetching your bookmarks',
    };
  }

  return {
    totalBookmarkCountForTheMonth: count,
  };
}
