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
import { removeBookmark } from '@/lib/db/bookmarks/mutations';
import { BookmarkPayload } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const RemoveBookmarkDialog = ({
  bookmark,
}: {
  bookmark: BookmarkPayload;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleRemoveBookmark = async () => {
    setIsLoading(true);
    await removeBookmark({ id: bookmark.id });
    setOpen(false);
    router.refresh();
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Remove Bookmark</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove Bookmark</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this bookmark?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            disabled={isLoading}
            variant="destructive"
            type="submit"
            size="sm"
            onClick={handleRemoveBookmark}
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
