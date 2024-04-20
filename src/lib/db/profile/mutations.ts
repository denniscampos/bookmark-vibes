'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { Database, Tables } from '../types';

type BaseProfile = Omit<Tables<'profile'>, 'created_at' | 'updated_at'>;
type UpdateProfile = Omit<BaseProfile, 'id'>;

export const updateProfle = async ({
  name,
  avatarUrl,
}: {
  name: string;
  avatarUrl: string;
}) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: 'You must be logged in to update your profile',
    };
  }

  const { data: profileData, error: profileError } = await supabase
    .from('profile')
    .select('id')
    .eq('user_id', user.id);

  if (profileError) {
    return {
      error: profileError.message,
    };
  }
  const existingProfileId = profileData?.[0]?.id;

  const upsertData: UpdateProfile = {
    user_id: user.id,
    name,
    avatar_url: avatarUrl,
  };

  if (profileData && profileData.length > 0) {
    (upsertData as BaseProfile).id = existingProfileId;
  }

  const { error } = await supabase.from('profile').upsert(upsertData);

  if (error) {
    return {
      error: error.message,
    };
  }
};
