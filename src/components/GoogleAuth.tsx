'use client';

import { createClient } from '@/utils/supabase/client';
import { Button } from './ui/button';
import { Icons } from './Icons';

/**
 * Running on the client instead of the server to avoid all kinds of form issues.
 */
export function GoogleAuth() {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      },
    });

    if (error) {
      console.error({ error });
    }
  };

  return (
    <Button
      className="w-full"
      variant="outline"
      size="sm"
      type="button"
      onClick={handleGoogleLogin}
    >
      <Icons.google className="mr-2 h-4 w-4" />
      Google
    </Button>
  );
}
