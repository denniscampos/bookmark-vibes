'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updateProfle } from '@/lib/db/profile/mutations';
import { createClient } from '@/utils/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { createId } from '@paralleldrive/cuid2';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const profileSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name must be at most 50 characters long' }),
  avatarUrl: z.string().optional(),
});

export type ProfileForm = z.infer<typeof profileSchema>;

export function UpdateProfile() {
  const [file, setFile] = useState<File>();
  const supabase = createClient();

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      avatarUrl: '',
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error('You must select an image to upload.');
    }

    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
    } else {
      console.error('No file selected');
    }
  };

  const uploadAvatar = async () => {
    if (!file) {
      console.error('No file to upload');
      return;
    }

    const id = createId();
    const fileExt = file.name.split('.').pop();
    const filePath = `${id}-${Math.random()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('avatar')
      .upload(filePath, file);

    if (error) {
      console.error('Error uploading file:', error.message);
    }

    return data;
  };

  const onSubmit = async (data: ProfileForm) => {
    try {
      const uploadedFilePath = await uploadAvatar();

      await updateProfle({
        name: data.name,
        avatarUrl: uploadedFilePath?.path ?? '',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="avatarUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update Profile</Button>
      </form>
    </Form>
  );
}
