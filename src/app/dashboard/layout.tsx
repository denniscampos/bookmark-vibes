import { SidebarNav } from '@/components/SidebarNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SidebarNav />
      {children}
    </div>
  );
}
