import { useCallback, useMemo } from 'react';

export const PAGINATION_DEFAULT_PAGE_SIZE = 6;

import { useSearchParams } from 'react-router-dom';

type UsePaginationParams<T> = {
  items: T[];
  pageSize?: number;
};

export function usePagination<T>({
  items,
  pageSize = PAGINATION_DEFAULT_PAGE_SIZE,
}: UsePaginationParams<T>) {
  const [searchParams, setSearchParams] = useSearchParams();

  // pageSize가 0/음수/비정상 값으로 들어오면 분모가 0이 되어 Infinity가 생길 수 있어 안전값으로 보정함
  const safePageSize = pageSize > 0 ? pageSize : PAGINATION_DEFAULT_PAGE_SIZE;

  const totalPages = Math.max(1, Math.ceil(items.length / safePageSize));

  const page = useMemo(() => {
    const raw = searchParams.get('page') ?? '1';
    const parsed = Number(raw);

    if (!Number.isFinite(parsed) || parsed < 1) return 1;
    return Math.min(parsed, totalPages);
  }, [searchParams, totalPages]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * safePageSize;
    return items.slice(start, start + safePageSize);
  }, [items, page, safePageSize]);

  const setPage = useCallback(
    (nextPage: number) => {
      const clamped = Math.min(Math.max(nextPage, 1), totalPages);

      setSearchParams((prev) => {
        const sp = new URLSearchParams(prev);
        sp.set('page', String(clamped));
        return sp;
      });
    },
    [totalPages, setSearchParams],
  );

  return {
    page,
    totalPages,
    pageItems,
    setPage,
  };
}
