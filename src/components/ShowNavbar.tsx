'use client';
import { usePathname } from 'next/navigation';

interface ShowNavbarProps {
  children: React.ReactNode;
}

export const ShowNavbar = ({ children }: ShowNavbarProps) => {
  const pathname = usePathname();

  if (pathname === '/login') {
    return <></>;
  }

  return <>{children}</>;
};
