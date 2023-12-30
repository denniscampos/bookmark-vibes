import Link from 'next/link';
import { Button } from './ui/button';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { ModeToggle } from './Toggle';
import { HomeOrDashboard } from './HomeOrDashboard';

export async function Navbar() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-gray-500/50 bg-card">
      <div className="flex justify-between items-center p-6">
        <HomeOrDashboard />
        <div className="flex items-center gap-4">
          <ModeToggle />
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
      </div>
    </header>
  );
}
