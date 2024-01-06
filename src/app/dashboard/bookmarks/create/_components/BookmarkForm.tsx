'use client';

import { Button } from '@/components/ui/button';
import { createBookmark } from '@/lib/db/bookmarks/mutations';
import { Bookmark, bookmarkSchema } from '@/lib/schemas/bookmarks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { CategorySelect } from './CategorySelect';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CategoryPayloadType } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

interface BookmarkFormProps {
  categories: CategoryPayloadType['data'];
}
export const BookmarkForm = ({ categories }: BookmarkFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<Bookmark>({
    defaultValues: {
      url: '',
      title: '',
      category_id: '',
      category_name: '',
    },
    resolver: zodResolver(bookmarkSchema),
  });

  const onSubmit = async (data: Bookmark) => {
    setIsLoading(true);
    try {
      await createBookmark(data);

      router.push('/dashboard/bookmarks');
      router.refresh();
      toast({
        title: 'Success',
        description: 'Bookmark created successfully.',
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Error',
          description: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <Card className="flex flex-col justify-center w-[300px] sm:w-[400px] mx-auto">
        <CardHeader>
          <CardTitle>Add Bookmark</CardTitle>
          <CardDescription>Add a new bookmark</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col space-y-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://www.twitter.com/" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Visualize server actions.."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CategorySelect categories={categories} form={form} />

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
        </CardContent>
      </Card>
    </Form>
  );
};
