// import { createClient } from '@/utils/supabase/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const provider = String(formData.get('provider'));
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const env = process.env.NODE_ENV;

  // Create a new user with their email and password
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // This is where the user will be redirected after signing up
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  });

  if (provider) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `${process.env.BASE_URL}/auth/callback`,
      },
    });

    if (error) {
      console.error({ error });
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=Could not authenticate user`,
        {
          // a 301 status is required to redirect from a POST to a GET route
          status: 301,
        }
      );
    }

    return NextResponse.redirect(data.url, {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    });
  }

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
      throw new Error(error.message);
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
