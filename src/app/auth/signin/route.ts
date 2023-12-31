import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const provider = String(formData.get('provider'));
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const env = process.env.NODE_ENV;

  /**
   * Sign in a user with their email and password using Supabase authentication.
   * @param email - The email of the user to sign in.
   * @param password - The password of the user to sign in.
   * @returns An object containing the user session if successful, or an error if unsuccessful.
   */
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (provider) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/auth/callback'
            : 'https://bookmark.vibes.vercel.app/auth/callback',
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

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Could not authenticate user`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  const dashboardUrl = `${requestUrl.origin}/dashboard`;

  return NextResponse.redirect(dashboardUrl, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
