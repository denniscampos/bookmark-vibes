import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { authSchema } from '@/lib/schemas/auth';

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  try {
    const body = await request.json();
    const { email, password } = authSchema.parse(body);
    // Create a new user with their email and password
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // This is where the user will be redirected after signing up
        emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error({ error });
      throw new Error(error.message);
    }

    return NextResponse.json({ body });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
