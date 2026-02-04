import type { ReactNode } from 'react';

const WINDOW_SIZE = 10;

function getWindowRange(totalPages: number, page: number, windowSize = WINDOW_SIZE) {
  const safeTotalPages = Math.max(1, totalPages);
  const safePage = Math.min(Math.max(1, page), safeTotalPages);

  const windowIndex = Math.floor((safePage - 1) / windowSize);
  const startPage = windowIndex * windowSize + 1;
  const endPage = Math.min(startPage + windowSize - 1, safeTotalPages);

  return { safeTotalPages, safePage, startPage, endPage };
}

const PAGE_BTN_BASE = 'rounded-lg px-3 py-2 text-xs font-medium';
const PAGE_BTN_ACTIVE = 'bg-point font-semibold text-black';
const PAGE_BTN_INACTIVE =
  'border border-border-default bg-bg-default text-text-default hover:bg-bg-muted';

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
  const { safeTotalPages, safePage, startPage, endPage } = getWindowRange(
    totalPages,
    page,
    WINDOW_SIZE,
  );

  // 윈도우(10개 묶음) 단위로 이동하는 버튼 상태
  const isFirstWindow = startPage <= 1;
  const isLastWindow = endPage >= safeTotalPages;

  const prevWindowPage = Math.max(1, startPage - WINDOW_SIZE);
  const nextWindowPage = Math.min(safeTotalPages, startPage + WINDOW_SIZE);

  return (
    <nav
      className={['flex w-full items-center justify-center gap-2', className]
        .filter(Boolean)
        .join(' ')}
      aria-label={ariaLabel}
    >
      <button
        type="button"
        className="rounded-lg border border-border-default bg-bg-muted px-3 py-2 text-xs font-medium text-text-default disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => onChange(prevWindowPage)}
        disabled={isFirstWindow}
      >
        {prevLabel}
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: endPage - startPage + 1 }).map((_, idx) => {
          const n = startPage + idx;
          const isActive = n === safePage;

          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={`${PAGE_BTN_BASE} ${isActive ? PAGE_BTN_ACTIVE : PAGE_BTN_INACTIVE}`}
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
        onClick={() => onChange(nextWindowPage)}
        disabled={isLastWindow}
      >
        {nextLabel}
      </button>
    </nav>
  );
}
