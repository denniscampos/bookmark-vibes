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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateBookmark } from '@/lib/db/bookmarks/mutations';
import { BookmarkPayload, CategoryPayloadType } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
  const [categoryName, setCategoryName] = useState(bookmark.url as string);
  const router = useRouter();

  const handleEditBookmark = async () => {
    setIsLoading(true);
    await updateBookmark({
      title,
      url,
      id: bookmark.id,
      category_name: categoryName,
    });
    setOpen(false);
    router.refresh();
    setIsLoading(false);
  };

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
        <div className="grid gap-4 py-4">
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
            <Select onValueChange={(value) => setCategoryName(value)}>
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
        </div>
        <DialogFooter>
          <Button
            disabled={isLoading}
            type="submit"
            onClick={handleEditBookmark}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Saving..
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
