'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import Link from 'next/link';

export function HomeOrDashboard() {
  const pathname = usePathname();

  const homePath = pathname === '/';

  return (
    <Button variant="ghost" size="sm" asChild>
      <Link href={homePath ? '/' : '/dashboard'}>Bookmark Vibes</Link>
    </Button>
  );
}
