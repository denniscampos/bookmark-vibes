import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { loginSchema } from '@/lib/schemas/auth';

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  /**
   * Sign in a user with their email and password using Supabase authentication.
   * @param email - The email of the user to sign in.
   * @param password - The password of the user to sign in.
   * @returns An object containing the user session if successful, or an error if unsuccessful.
   */

  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ body });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
