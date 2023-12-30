import Link from 'next/link';
import { Button } from './ui/button';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function Navbar() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header>
      <div className="flex justify-between items-center p-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">Bookmark Vibes</Link>
        </Button>
        {user ? (
          <form action="/auth/signout" method="post">
            <Button size="sm">Logout</Button>
          </form>
        ) : (
          <Button size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
