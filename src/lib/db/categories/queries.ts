import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function getCategories() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: 'You must be logged in to view your categories',
    };
  }

  const { data, error } = await supabase
    .from('category')
    .select('name, id')
    .eq('user_id', user.id);

  if (error) {
    return {
      error: 'There was an error fetching your categories',
    };
  }

  return {
    data,
  };
}
