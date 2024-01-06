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
import { toast } from '@/components/ui/use-toast';
import { removeCategory } from '@/lib/db/categories/mutations';
import { CategoryPayloadType } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const RemoveCategoryDialog = ({
  category,
}: {
  category: CategoryPayloadType['data'];
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleRemoveCategory = async () => {
    setIsLoading(true);
    try {
      await removeCategory({ id: category?.[0].id as string });
      setOpen(false);

      toast({
        title: 'Success',
        description: 'Category removed successfully',
      });
      router.push(`/dashboard/category`);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Remove Category</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove Category</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this category?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            disabled={isLoading}
            variant="destructive"
            type="submit"
            size="sm"
            onClick={handleRemoveCategory}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Deleting..
              </>
            ) : (
              'Confirm'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
