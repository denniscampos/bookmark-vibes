'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { updateBookmark } from '@/lib/db/bookmarks/mutations';
import { Bookmark, bookmarkSchema } from '@/lib/schemas/bookmarks';
import { BookmarkPayload, CategoryPayloadType } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const EditBookmarkDialog = ({
  bookmark,
  categoryData,
  showEditDialog,
  setShowEditDialog,
}: {
  bookmark: BookmarkPayload;
  categoryData?: CategoryPayloadType['data'];
  showEditDialog: boolean;
  setShowEditDialog: (bool: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState(
    bookmark.category_name as string
  );
  const router = useRouter();

  const form = useForm<Bookmark>({
    defaultValues: {
      title: bookmark.title || '',
      url: bookmark.url || '',
      category_id: bookmark.category_id || '',
      category_name: bookmark.category_name || '',
    },
    resolver: zodResolver(bookmarkSchema),
  });

  const onSubmit = async (data: Bookmark) => {
    setIsLoading(true);
    try {
      await updateBookmark({
        title: data.title,
        url: data.url,
        id: bookmark.id,
        category_name: categoryName,
        category_id: categoryId ? categoryId : (bookmark.category_id as string),
      });

      toast({
        title: 'Success',
        description: 'Bookmark updated successfully.',
      });

      setShowEditDialog(false);
      router.refresh();
    } catch (error) {
      console.error({ error });
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
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Bookmark</DialogTitle>
          <DialogDescription>
            Make changes to your bookmark here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Server actions in Next.js" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const selectedCategory = categoryData?.find(
                        (category) => category.name === value
                      );
                      if (selectedCategory) {
                        setCategoryId(selectedCategory.id as string);
                        setCategoryName(selectedCategory.name as string);
                      }
                    }}
                    defaultValue={bookmark.category_name || field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={bookmark.category_name} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categoryData?.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.name ?? ''}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="flex gap-2 items-center justify-end">
              <Button
                onClick={() => setShowEditDialog(!showEditDialog)}
                variant="secondary"
                type="button"
                size="sm"
              >
                Cancel
              </Button>
              <Button disabled={isLoading} type="submit" size="sm">
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Saving..
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
