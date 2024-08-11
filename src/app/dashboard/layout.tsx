import { Header } from '@/components/Header';
import { SideNav } from '@/components/SideNav';
import { createClient } from '@/utils/supabase/server';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <SideNav />
      </div>
      <div className="flex flex-col">
        <Header user={user} />
        {children}
      </div>
    </div>
  );
}
