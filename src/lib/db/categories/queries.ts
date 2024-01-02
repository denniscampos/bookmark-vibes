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

  const { data, error } = await supabase
    .from('bookmark_category')
    .select('category_id, category(name)', {
      count: 'exact',
    })
    .eq('user_id', user.id);

  if (error) {
    return {
      error: 'There was an error fetching your categories',
    };
  }

  const categoryCounts = data.reduce((acc: Record<string, number>, item) => {
    // If the category name is already a key in the accumulator, increment its count
    if (item && item.category && item.category.name) {
      if (acc[item.category.name]) {
        acc[item.category.name] += 1;
      } else {
        acc[item.category.name] = 1;
      }
    }

    return acc;
  }, {});

  let mostBookmarkedCategory = '';
  let maxCount = 0;
  for (const [name, count] of Object.entries(categoryCounts)) {
    if (count > maxCount) {
      mostBookmarkedCategory = name;
      maxCount = count;
    }
  }

  return {
    data,
    count: categoryCounts,
    mostBookmarkedCategory,
  };
}
