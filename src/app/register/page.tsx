import { redirect } from 'next/navigation';
import { RegisterForm } from './_components/RegisterForm';
import { createClient } from '@/utils/supabase/server';

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
      <RegisterForm />
    </div>
  );
}
