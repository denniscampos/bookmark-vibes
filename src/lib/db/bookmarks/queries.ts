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
