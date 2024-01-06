import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { loginSchema } from '@/lib/schemas/auth';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  /**
   * Sign in a user with their email and password using Supabase authentication.
   * @param email - The email of the user to sign in.
   * @param password - The password of the user to sign in.
   * @returns An object containing the user session if successful, or an error if unsuccessful.
   */

  try {
    const body = loginSchema.parse({
      email,
      password,
    });

    const { error } = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });

    if (error) {
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=Could not authenticate user`,
        {
          // a 301 status is required to redirect from a POST to a GET route
          status: 301,
        }
      );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error.issues);
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=${error.issues[0].message}`,
        {
          // a 301 status is required to redirect from a POST to a GET route
          status: 301,
        }
      );
    }
  }

  const dashboardUrl = `${requestUrl.origin}/dashboard`;

  return NextResponse.redirect(dashboardUrl, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
