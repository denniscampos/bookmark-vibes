'use server';

import { createClient } from '@/utils/supabase/server';
export async function initializeAndAuthenticateUser() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return {
    supabase,
    user: error ? null : user,
    error: error?.message || null,
  };
}
