'use client';

import Link from 'next/link';
import { HomeOrDashboard } from './HomeOrDashboard';
import { MobileSheetNav } from './MobileSheetNav';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';

export function RenderLogoNav() {
  const pathname = usePathname();
  const homePath = pathname === '/';

  return (
    <div>
      {homePath ? (
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">Bookmark Vibes</Link>
        </Button>
      ) : (
        <>
          <div className="hidden sm:flex">
            <HomeOrDashboard />
          </div>
          <div className="flex sm:hidden">
            <MobileSheetNav />
          </div>
        </>
      )}
    </div>
  );
}
