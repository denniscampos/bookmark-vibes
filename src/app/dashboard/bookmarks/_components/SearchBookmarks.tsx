'use client';

import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';

export function SearchBookmarks() {
  const searchParams = useSearchParams();
  const search = new URLSearchParams(searchParams.toString());
  const router = useRouter();

  return (
    <>
      <Input
        placeholder="Search.."
        onChange={async (e) => {
          const currentSearch = e.target.value;
          search.set('query', currentSearch);
          router.push(
            `/dashboard/bookmarks?query=${currentSearch.toString()}`,
            {
              scroll: false,
            }
          );
        }}
      />
    </>
  );
}
