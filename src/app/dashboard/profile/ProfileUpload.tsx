'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/utils/supabase/client';
import { createId } from '@paralleldrive/cuid2';
import { ChangeEvent, FormEvent, useState } from 'react';

export function ProfileUpload() {
  const [file, setFile] = useState<File>();
  const supabase = createClient();

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      console.error('No file to upload');
      return;
    }

    const id = createId();
    const fileExt = file.name.split('.').pop();
    const filePath = `${id}-${Math.random()}.${fileExt}`;

    const { error } = await supabase.storage
      .from('avatar')
      .upload(filePath, file);

    if (error) {
      console.error('Error uploading file:', error.message);
    }
  };

  return (
    <div>
      <h1>Profile Pic</h1>
      <form onSubmit={handleSubmit}>
        <Input type="file" accept="image/*" onChange={handleFileChange} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
