'use server';

import { Bookmark } from '@/lib/schemas/bookmarks';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

type BookmarkType = Bookmark & {
  category_id: string;
  category_name: string;
};

export const createBookmark = async ({
  url,
  title,
  category_id,
  category_name,
}: BookmarkType) => {
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

  const { data, error } = await supabase
    .from('bookmark')
    .insert([
      {
        url,
        title,
        user_id: user.id,
        category_id,
        category_name,
      },
    ])
    .select();

  const { error: bookmarkCategoryError } = await supabase
    .from('bookmark_category')
    .insert([
      {
        category_id,
        bookmark_id: data?.[0].id,
        user_id: user.id,
      },
    ]);

  if (error || bookmarkCategoryError) {
    return {
      error: error?.message,
    };
  }

  return {
    data,
  };
};

export const updateBookmark = async ({
  title,
  url,
  id,
  category_name,
  category_id,
}: {
  title: string;
  url: string;
  id: string;
  category_name: string;
  category_id: string;
}) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: 'Unauthorized to update bookmark',
    };
  }

  const { error } = await supabase
    .from('bookmark')
    .update({
      title,
      url,
      category_name,
      category_id,
    })
    .eq('id', id)
    .match({ user_id: user.id });

  if (error) {
    return {
      error: error.message,
    };
  }
};

export const removeBookmark = async ({ id }: { id: string }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: 'Unauthorized to delete bookmark',
    };
  }

  const { error } = await supabase
    .from('bookmark')
    .delete()
    .eq('id', id)
    .match({ user_id: user.id });

  if (error) {
    return {
      error: error.message,
    };
  }
};
