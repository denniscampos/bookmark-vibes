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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createCategory } from '@/lib/db/categories/mutations';
import { Category, categorySchema } from '@/lib/schemas/categories';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { toast } from './ui/use-toast';

interface CategoryDialogProps {
  addCategory?: boolean;
  setAddCategory?: (bool: boolean) => void;
  dialogDescription: string;
}

export const CategoryDialog = ({
  addCategory,
  setAddCategory,
  dialogDescription,
}: CategoryDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<Category>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(categorySchema),
  });

  const isBookmarkPage = pathname === '/dashboard/bookmarks/create';

  const onSubmit = async (data: Category) => {
    setIsLoading(true);
    try {
      await createCategory({ name: data.name });

      toast({
        title: 'Success',
        description: 'Category created successfully.',
      });

      if (isBookmarkPage) {
        setAddCategory?.(false);
      } else {
        setOpen(false);
      }

      router.refresh();
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
    <Dialog
      open={isBookmarkPage ? addCategory : open}
      onOpenChange={isBookmarkPage ? setAddCategory : setOpen}
    >
      <DialogTrigger asChild>
        <Button size="sm">Create Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Category</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Entertainment" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit" size="sm">
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Category'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
