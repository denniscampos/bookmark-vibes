'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Bookmark, Folder, Home, Menu } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export const MobileSheetNav = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left">
        <div>
          <ul>
            {pathname === '/' ? (
              <li className="flex items-center">
                <SheetClose asChild>
                  <Button variant="link" size="sm" asChild>
                    <Link href="/dashboard">
                      <Home
                        stroke="currentColor"
                        className="w-4 h-4 mr-2 text-white"
                      />{' '}
                      Home
                    </Link>
                  </Button>
                </SheetClose>
              </li>
            ) : (
              <>
                <li className="flex items-center">
                  <SheetClose asChild>
                    <Button variant="link" size="sm" asChild>
                      <Link href="/dashboard">
                        <Home
                          stroke="currentColor"
                          className="w-4 h-4 mr-2 text-white"
                        />{' '}
                        Home
                      </Link>
                    </Button>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <Button variant="link" size="sm" asChild>
                      <Link href="/dashboard/bookmarks">
                        <Bookmark
                          stroke="currentColor"
                          className="w-4 h-4 mr-2 text-white"
                        />{' '}
                        My Bookmarks
                      </Link>
                    </Button>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <Button variant="link" size="sm" asChild>
                      <Link href="/dashboard/category">
                        <Folder
                          stroke="currentColor"
                          className="w-4 h-4 mr-2 text-white"
                        />{' '}
                        My Categories
                      </Link>
                    </Button>
                  </SheetClose>
                </li>
              </>
            )}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};
