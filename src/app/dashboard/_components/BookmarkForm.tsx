'use client';

import { Button } from '@/components/ui/button';
import { createBookmark } from '@/lib/db/bookmarks/mutations';
import { Bookmark, bookmarkSchema } from '@/lib/schemas/bookmarks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export const BookmarkForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Bookmark>({
    defaultValues: {
      url: '',
      title: '',
    },
    resolver: zodResolver(bookmarkSchema),
  });

  const onSubmit = async (data: Bookmark) => {
    setIsLoading(true);
    try {
      await createBookmark(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="url">URL</Label>
        <Input id="url" {...register('url')} />
        <p className="text-red-500">{errors.url?.message}</p>

        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register('title')} />
        <p className="text-red-500">{errors.title?.message}</p>

        <Button disabled={isLoading} type="submit" size="sm">
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" /> Saving..
            </>
          ) : (
            'Save'
          )}
        </Button>
      </form>
    </div>
  );
};
