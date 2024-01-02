import { FeatureSection } from '@/components/FeatureSection';
import { Button } from '@/components/ui/button';
import { protectedRoutes } from '@/utils/protectedRoutes';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  /** Although a protected route function, it is here to make sure
   * user gets redirected to the dashboard. Just to avoid creating a new function */
  const user = await protectedRoutes();

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
          Get Started <ExternalLink className="w-4 h-4" />
        </Link>
      </Button>

      <div className="my-12">
        <FeatureSection />
      </div>
    </main>
  );
}
