import { SidebarNav } from '@/components/SidebarNav';
import { Toaster } from '@/components/ui/toaster';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SidebarNav />
      {children}
      <Toaster />
    </div>
  );
}
