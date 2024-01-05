import Link from 'next/link';
import { Button } from './ui/button';
import { Bookmark, Folder, Home } from 'lucide-react';

export const SidebarNav = () => {
  return (
    <nav className="bg-card border-r border-gray-500/50 h-screen hidden sm:flex w-[350px] p-4">
      <ul>
        <li className="flex items-center">
          <Button variant="link" size="sm" asChild>
            <Link href="/dashboard">
              <Home
                stroke="currentColor"
                className="w-4 h-4 mr-2 text-black dark:text-white"
              />{' '}
              Home
            </Link>
          </Button>
        </li>
        <li>
          <Button variant="link" size="sm" asChild>
            <Link href="/dashboard/bookmarks">
              <Bookmark
                stroke="currentColor"
                className="w-4 h-4 mr-2 text-black dark:text-white"
              />{' '}
              My Bookmarks
            </Link>
          </Button>
        </li>
        <li>
          <Button variant="link" size="sm" asChild>
            <Link href="/dashboard/category">
              <Folder
                stroke="currentColor"
                className="w-4 h-4 mr-2 text-black dark:text-white"
              />{' '}
              My Categories
            </Link>
          </Button>
        </li>
      </ul>
    </nav>
  );
};
