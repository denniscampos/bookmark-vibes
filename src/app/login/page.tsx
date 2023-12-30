import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div>
      <form action="/auth/signin" method="post">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" />

        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />

        <Button size="sm">Sign In</Button>

        <Button formAction="/auth/signup" size="sm">
          Sign Up
        </Button>
      </form>
    </div>
  );
}
