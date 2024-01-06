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
import { updateCategory } from '@/lib/db/categories/mutations';
import { Category, categorySchema } from '@/lib/schemas/categories';
import { CategoryPayloadType } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type EditCategoryDialogProps = {
  categoryData?: CategoryPayloadType['data'];
  showEditDialog: boolean;
  setShowEditDialog: (show: boolean) => void;
};

export const EditCategoryDialog = ({
  categoryData,
  showEditDialog,
  setShowEditDialog,
}: EditCategoryDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  //   const [categoryId, setCategoryId] = useState('');
  //   const [categoryName, setCategoryName] = useState(bookmark.url as string);
  const router = useRouter();

  const form = useForm<Category>({
    defaultValues: {
      name: categoryData?.[0].name || '',
    },
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = async (data: Category) => {
    setIsLoading(true);
    await updateCategory({
      category_id: categoryData?.[0].id as string,
      category_name: data.name,
    });

    setShowEditDialog(false);
    router.refresh();
    setIsLoading(false);
  };

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Make changes to your category name here. Click save when you&#39;re
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Entertainment" />
                  </FormControl>
                  <FormMessage />
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
