'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type PaginationProps = {
  page: number;
  totalCount: number | null | undefined;
  itemsPerPage: number | undefined;
};

export function Pagination({
  page,
  totalCount,
  itemsPerPage,
}: PaginationProps) {
  const router = useRouter();

  const currentPage = Number(page);
  const lastPage = Math.ceil(totalCount! / itemsPerPage!);

  const goToNextPage = () => {
    if (currentPage < lastPage) {
      const nextPage = currentPage + 1;
      router.push(`?page=${nextPage}`);
    }
  };

  const goToPreviousPage = () => {
    const prevPage = currentPage - 1;
    router.push(`?page=${prevPage}`);
  };

  const isNextDisabled = currentPage >= lastPage;
  const isPrevDisabled = currentPage <= 1;

  return (
    <div className="flex justify-center gap-10 w-full">
      <Button
        variant="outline"
        size="icon"
        onClick={goToPreviousPage}
        disabled={isPrevDisabled}
      >
        <ArrowLeft className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={goToNextPage}
        disabled={isNextDisabled}
      >
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
