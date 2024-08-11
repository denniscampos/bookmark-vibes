import { User } from '@supabase/supabase-js';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Link from 'next/link';
import { signout } from '@/actions/signout';
import { CircleUser } from 'lucide-react';
import { Button } from './ui/button';

export function UserNav({ user }: { user: User | null }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <UserAvatar user={user} />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user?.email ?? 'Welcome'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link className="w-full" href="/dashboard/profile">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full" href="/dashboard/settings">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <form className="w-full">
            <button
              className="w-full text-start"
              formAction={signout}
              type="submit"
            >
              Log out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserAvatar({ user }: { user: User | null }) {
  // TODO: Grab info from profile table instead.

  return (
    <Avatar>
      <AvatarImage src={user?.user_metadata.avatar_url} alt="" />
      <AvatarFallback>
        <CircleUser size="icon" className="h-5 w-5" />
      </AvatarFallback>
    </Avatar>
  );
}
