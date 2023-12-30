import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Create a new user with their email and password
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // This is where the user will be redirected after signing up
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  });

  if (data) {
    const { error } = await supabase.from('category').insert([
      {
        name: 'Food',
        user_id: data.user?.id,
      },
      {
        name: 'Tech',
        user_id: data.user?.id,
      },
      {
        name: 'Entertainment',
        user_id: data.user?.id,
      },
    ]);

    if (error) {
      return {
        error: error.message,
      };
    }
  }

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Could not authenticate user`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/login?message=Check email to continue sign in process`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  );
}
