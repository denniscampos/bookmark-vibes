'use client';

import { useSearchParams } from 'next/navigation';

export function ErrorMessage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const message = searchParams.get('message');

  return (
    <>
      {error && (
        <p className="p-4 mt-4 text-center text-red-500 text-sm">{error}</p>
      )}
      {message && (
        <p className="p-4 mt-4 text-center bg-foreground/10 text-red-500 text-sm">
          {message}
        </p>
      )}
    </>
  );
}
