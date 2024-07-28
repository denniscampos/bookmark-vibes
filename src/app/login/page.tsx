import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { LoginForm } from './_components/LoginForm';

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="flex h-screen items-center">
      <LoginForm />
    </div>
  );
}
