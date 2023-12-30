import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getSession } from '@/utils/supabase/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getSession();

  if (session) {
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
