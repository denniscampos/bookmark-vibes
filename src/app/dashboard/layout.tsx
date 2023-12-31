import { SidebarNav } from '@/components/SidebarNav';
import { protectedRoutes } from '@/utils/protectedRoutes';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await protectedRoutes();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex">
      <SidebarNav />
      {children}
    </div>
  );
}
