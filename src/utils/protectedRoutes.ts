import { createClient } from './supabase/server';

export const protectedRoutes = async () => {
  const supabase = createClient();

  const { data: user, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return user;
};
