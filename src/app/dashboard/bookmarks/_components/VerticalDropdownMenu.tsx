'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { EditBookmarkDialog } from './EditBookmarkDialog';
import { RemoveBookmarkDialog } from './RemoveBookmarkDialog';
import { BookmarkPayload, CategoryPayloadType } from '@/lib/types';
import { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';

export const VerticalDropdownMenu = ({
  bookmark,
  categoryData,
}: {
  bookmark: BookmarkPayload;
  categoryData?: CategoryPayloadType['data'];
}) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  /** https://stackoverflow.com/a/77186946 Dialog Issue Fix */
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline">
            <MoreVertical className="w-6 h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* The Fix https://stackoverflow.com/a/77445607  */}
          <DropdownMenuItem onSelect={() => setShowEditDialog(true)}>
            Edit Bookmark
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              //TODO remove this and create another state
              e.preventDefault();
              document.body.style.pointerEvents = '';
            }}
          >
            <RemoveBookmarkDialog bookmark={bookmark} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditBookmarkDialog
        bookmark={bookmark}
        categoryData={categoryData}
        showEditDialog={showEditDialog}
        setShowEditDialog={setShowEditDialog}
      />
    </>
  );
};
