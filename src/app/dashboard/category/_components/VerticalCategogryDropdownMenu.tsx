'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { EditCategoryDialog } from './EditCategoryDialog';
import { CategoryPayloadType } from '@/lib/types';
import { useState } from 'react';

export const VerticalCategoryDropdownMenu = ({
  categoryData,
}: {
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
            Edit Category
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              //TODO remove this and create another state
              e.preventDefault();
              document.body.style.pointerEvents = '';
            }}
          >
            Placeholder
            {/* <RemoveBookmarkDialog bookmark={bookmark} /> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditCategoryDialog
        categoryData={categoryData}
        showEditDialog={showEditDialog}
        setShowEditDialog={setShowEditDialog}
      />
    </>
  );
};
