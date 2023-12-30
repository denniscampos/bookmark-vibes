'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createCategory } from '@/lib/db/categories/mutations';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CategoryDialogProps {
  addCategory: boolean;
  setAddCategory: (bool: boolean) => void;
}

export const CategoryDialog = ({
  addCategory,
  setAddCategory,
}: CategoryDialogProps) => {
  const [categoryName, setCategoryName] = useState('');
  const router = useRouter();

  const handleCategory = async () => {
    await createCategory({ name: categoryName });
    setAddCategory(false);
    router.refresh();
  };

  return (
    <Dialog open={addCategory} onOpenChange={setAddCategory}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Category</DialogTitle>
          <DialogDescription>
            Add a category to your bookmarks.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              onChange={(e) => setCategoryName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCategory} type="submit">
            Add Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
