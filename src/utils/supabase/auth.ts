import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

/**
 * Helper to grab the current user session
 */
export const getSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
};
