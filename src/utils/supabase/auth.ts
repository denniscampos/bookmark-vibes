import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

const cookieStore = cookies();
const supabase = createClient(cookieStore);

/**
 * Helper to grab the current user session
 */
export const getSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
};
