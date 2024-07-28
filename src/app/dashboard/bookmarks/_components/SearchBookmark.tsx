'use client';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function SearchBookmark() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Input
      id="query"
      name="query"
      className="w-full sm:w-[400px]"
      placeholder="Search.."
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      // keeps it in sync
      defaultValue={searchParams.get('query')?.toString()}
    />
  );
}
