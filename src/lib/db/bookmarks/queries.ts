'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function getUserBookmarks() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: 'You must be logged in to view your bookmarks',
    };
  }

  const { data, error } = await supabase
    .from('bookmark')
    .select('id, url, title, category_id, category_name')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return {
      error: 'There was an error fetching your bookmarks',
    };
  }

  return {
    data,
  };
}

export async function recentBookmarks() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: 'You must be logged in to view your bookmarks',
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
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: 'You must be logged in to view your bookmarks',
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
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: 'You must be logged in to view your bookmarks',
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
