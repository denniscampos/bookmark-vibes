import { redirect } from 'next/navigation';
import { RegisterForm } from './_components/RegisterForm';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

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
    <div className="flex h-screen items-center">
      <RegisterForm />
    </div>
  );
}
