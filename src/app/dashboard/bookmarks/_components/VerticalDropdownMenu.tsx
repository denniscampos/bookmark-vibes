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
import { BookmarkPayload } from '@/lib/types';

export const VerticalDropdownMenu = ({
  bookmark,
}: {
  bookmark: BookmarkPayload;
}) => {
  /** https://stackoverflow.com/a/77186946 Dialog Issue Fix */
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <MoreVertical className="w-6 h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            document.body.style.pointerEvents = '';
          }}
        >
          <EditBookmarkDialog bookmark={bookmark} />
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            document.body.style.pointerEvents = '';
          }}
        >
          <RemoveBookmarkDialog bookmark={bookmark} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};