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
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

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
  const [categoryName, setCategoryName] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const isBookmarkPage = pathname === '/dashboard/bookmarks/create';

  const handleCategory = async () => {
    setIsLoading(true);
    await createCategory({ name: categoryName });

    if (isBookmarkPage) {
      setAddCategory?.(false);
    } else {
      setOpen(false);
    }

    router.refresh();
    setIsLoading(false);
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
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name" className="">
              Name
            </Label>
            <Input
              id="name"
              onChange={(e) => setCategoryName(e.target.value)}
              className="col-span-3"
              placeholder="Category name"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={isLoading}
            onClick={handleCategory}
            type="submit"
            size="sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Adding...
              </>
            ) : (
              'Add Category'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
