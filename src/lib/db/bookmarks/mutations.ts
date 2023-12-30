'use server';

import { Bookmark } from '@/lib/schemas/bookmarks';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export const createBookmark = async ({ url, title }: Bookmark) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: 'You must be logged in to create a bookmark',
    };
  }

  const { data, error } = await supabase.from('bookmark').insert([
    {
      url,
      title,
      user_id: user.id,
    },
  ]);

  if (error) {
    return {
      error: error.message,
    };
  }

  return {
    data,
  };
};
