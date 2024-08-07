import { FeatureSection } from '@/components/FeatureSection';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const supabase = createClient();
  const { data: session } = await supabase.auth.getUser();
  const user = session?.user;

  return (
    <main className="flex flex-col items-center justify-center gap-5 h-auto sm:h-screen mt-10 sm:mt-0 p-4">
      <h1 className="text-4xl sm:text-7xl font-bold">
        Bookmark <span className="text-primary">Vibes</span>
      </h1>
      <p className="text-lg sm:text-3xl text-muted-foreground">
        Your digital bookmark for Twitter
      </p>
      <Button asChild>
        <Link href={user ? '/dashboard' : '/login'} className="flex gap-2">
          {user ? 'Dashboard' : 'Get Started'}{' '}
          <ExternalLink className="w-4 h-4" />
        </Link>
      </Button>

      <div className="my-12">
        <FeatureSection />
      </div>
    </main>
  );
}
