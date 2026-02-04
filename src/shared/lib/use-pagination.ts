import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

type UsePaginationParams<T> = {
  items: T[];
  pageSize?: number;
};

export function usePagination<T>({ items, pageSize = 6 }: UsePaginationParams<T>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const page = useMemo(() => {
    const raw = searchParams.get('page') ?? '1';
    const parsed = Number(raw);

    if (!Number.isFinite(parsed) || parsed < 1) return 1;
    return Math.min(parsed, totalPages);
  }, [searchParams, totalPages]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  const setPage = (nextPage: number) => {
    const clamped = Math.min(Math.max(nextPage, 1), totalPages);

    setSearchParams((prev) => {
      const sp = new URLSearchParams(prev);
      sp.set('page', String(clamped));
      return sp;
    });
  };

  return {
    page,
    totalPages,
    pageItems,
    setPage,
  };
}
