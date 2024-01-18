'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CategoryPayloadType } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';

type SearchBookmarksProps = {
  categoryData: CategoryPayloadType['data'];
};

export function SearchBookmarks({ categoryData }: SearchBookmarksProps) {
  const searchParams = useSearchParams();
  const search = new URLSearchParams(searchParams.toString());
  const router = useRouter();

  return (
    <>
      <Input
        className="w-full sm:w-[400px]"
        placeholder="Search.."
        onChange={async (e) => {
          const currentSearch = e.target.value;
          const category = search.get('category');
          const updatedUrl = category
            ? `/dashboard/bookmarks?query=${currentSearch}&category=${category}`
            : `/dashboard/bookmarks?query=${currentSearch}`;
          router.push(updatedUrl, {
            scroll: false,
          });
        }}
        defaultValue={searchParams.get('query') ?? ''}
      />
      <SelectCategory
        categoryData={categoryData}
        search={search}
        router={router}
      />
    </>
  );
}

type SelectCategoryProps = {
  categoryData: CategoryPayloadType['data'];
  search: URLSearchParams;
  router: ReturnType<typeof useRouter>;
};

function SelectCategory({ categoryData, search, router }: SelectCategoryProps) {
  return (
    <Select
      onValueChange={(value) => {
        if (value === 'All') {
          search.delete('category');
          const query = search.get('query');
          const updatedUrl = query
            ? `/dashboard/bookmarks?query=${query}`
            : `/dashboard/bookmarks`;

          router.push(updatedUrl, { scroll: false });
          return;
        }

        search.set('category', value);
        const query = search.get('query');
        const updatedUrl = query
          ? `/dashboard/bookmarks?query=${query}&category=${value}`
          : `/dashboard/bookmarks?category=${value}`;
        router.push(updatedUrl, { scroll: false });
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="All">All</SelectItem>
          {categoryData?.map((category) => (
            <SelectItem key={category.id} value={category.name as string}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

//TODO:
// Some categories renders and some an empty list.. investigate
// move to its own component
