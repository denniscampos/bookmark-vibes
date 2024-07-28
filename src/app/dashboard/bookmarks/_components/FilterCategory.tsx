'use client';

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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function FilterCategory({
  categories,
}: {
  categories: CategoryPayloadType['data'];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);

    if (category) {
      params.set('category', category);
    }

    if (category === 'All' || category === 'No categories') {
      params.delete('category');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select onValueChange={(value) => handleCategoryChange(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {categories ? (
            categories.map((category) => (
              <>
                <SelectItem value="All">All</SelectItem>
                <SelectItem key={category.id} value={category.name as string}>
                  {category.name}
                </SelectItem>
              </>
            ))
          ) : (
            <SelectItem value="No categories">No categories</SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
