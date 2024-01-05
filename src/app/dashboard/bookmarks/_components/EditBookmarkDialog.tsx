'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
}: {
  bookmark: BookmarkPayload;
  categoryData?: CategoryPayloadType['data'];
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(bookmark.title as string);
  const [url, setUrl] = useState(bookmark.url as string);
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState(bookmark.url as string);
  const router = useRouter();

  //TODO: This file is a WIP. Currently the document. from prev component is disallowing for spacing in inputs

  const form = useForm<Bookmark>({
    defaultValues: {
      title: bookmark.title || '',
      url: bookmark.url || '',
      // check to confirm
      category_id: bookmark.category_id || '',
      category_name: bookmark.category_name || '',
    },
    resolver: zodResolver(bookmarkSchema),
  });

  const onSubmit = async (data: Bookmark) => {
    setIsLoading(true);
    await updateBookmark({
      title: data.title,
      url: data.url,
      id: bookmark.id,
      category_name: categoryName,
      category_id: categoryId,
    });
    // await updateBookmark({
    //   title,
    //   url,
    //   id: bookmark.id,
    //   category_name: categoryName,
    //   category_id: categoryId,
    // });
    setOpen(false);
    router.refresh();
    setIsLoading(false);
  };

  // const handleEditBookmark = async () => {
  //   setIsLoading(true);
  //   await updateBookmark({
  //     title,
  //     url,
  //     id: bookmark.id,
  //     category_name: categoryName,
  //     category_id: categoryId,
  //   });
  //   setOpen(false);
  //   router.refresh();
  //   setIsLoading(false);
  // };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Edit Bookmark</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Bookmark</DialogTitle>
          <DialogDescription>
            Make changes to your bookmark here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  <FormLabel>Cateogry</FormLabel>
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
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={bookmark.category_name} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categoryData?.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.name as string}
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
            <Button disabled={isLoading} type="submit">
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Saving..
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </form>
        </Form>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              defaultValue={bookmark.title as string}
              className="col-span-3"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              URL
            </Label>
            <Input
              id="url"
              name="url"
              defaultValue={bookmark.url as string}
              className="col-span-3"
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
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
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={bookmark.category_name} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categoryData?.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.name as string}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div> */}
      </DialogContent>
    </Dialog>
  );
};
