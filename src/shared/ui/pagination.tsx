import type { ReactNode } from 'react';

type PaginationProps = {
  /** 현재 페이지(1부터 시작) */
  page: number;

  /** 전체 페이지 수(1 이상) */
  totalPages: number;

  /** 페이지 변경 요청 콜백 */
  onChange: (nextPage: number) => void;

  /** (선택) aria-label 커스터마이즈 */
  ariaLabel?: string;

  /** (선택) 추가 className */
  className?: string;

  /** (선택) 이전/다음 버튼 라벨 */
  prevLabel?: ReactNode;
  nextLabel?: ReactNode;
};

export function Pagination({
  page,
  totalPages,
  onChange,
  ariaLabel = '페이지 이동',
  className,
  prevLabel = '이전',
  nextLabel = '다음',
}: PaginationProps) {
  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  return (
    <nav
      className={`flex w-full items-center justify-center gap-2 ${className ?? ''}`}
      aria-label={ariaLabel}
    >
      <button
        type="button"
        className="rounded-lg border border-border-default bg-bg-muted px-3 py-2 text-xs font-medium text-text-default disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => onChange(page - 1)}
        disabled={isFirst}
      >
        {prevLabel}
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }).map((_, idx) => {
          const n = idx + 1;
          const isActive = n === page;

          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={
                isActive
                  ? 'rounded-lg bg-point px-3 py-2 text-xs font-semibold text-black'
                  : 'rounded-lg border border-border-default bg-bg-default px-3 py-2 text-xs font-medium text-text-default hover:bg-bg-muted'
              }
              aria-current={isActive ? 'page' : undefined}
            >
              {n}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="rounded-lg border border-border-default bg-bg-muted px-3 py-2 text-xs font-medium text-text-default disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => onChange(page + 1)}
        disabled={isLast}
      >
        {nextLabel}
      </button>
    </nav>
  );
}
