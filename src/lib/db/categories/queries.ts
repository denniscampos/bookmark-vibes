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

export async function getUserCategories() {
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

  // const { data, error } = await supabase
  //   .from('bookmark_category')
  //   .select('category_id, bookmark_id')
  //   .eq('user_id', user.id);

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

export async function getBookmarksByCategoryId({
  categoryId,
}: {
  categoryId: string;
}) {
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
    .from('bookmark')
    .select()
    .eq('category_id', categoryId)
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

export async function getCategoryById({ id }: { id: string }) {
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
    .match({ id })
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

export async function categoryOverview() {
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

  const { data, error, count } = await supabase
    .from('category')
    .select('name, id', { count: 'exact' })
    .eq('user_id', user.id);

  if (error) {
    return {
      error: 'There was an error fetching your categories',
    };
  }

  const categoryCounts: Record<string, number> = data.reduce(
    (acc: Record<string, number>, item) => {
      if (item.name) {
        acc[item.name] = (acc[item.name] || 0) + 1;
      }
      return acc;
    },
    {}
  );

  return {
    data,
    count: categoryCounts,
  };
}
