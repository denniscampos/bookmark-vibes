'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

type CategoryType = {
  name: string;
};

export const createCategory = async ({ name }: CategoryType) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: 'You must be logged in to create a category',
    };
  }

  const { data: categories } = await supabase
    .from('category')
    .select('name')
    .eq('user_id', user.id);

  const categoryExists = categories?.some((category) => category.name === name);

  if (categoryExists) {
    return {
      error: 'You already have a category with that name',
    };
  }

  const { data, error } = await supabase.from('category').insert([
    {
      name,
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
