import { usePagination } from '@/shared/lib/use-pagination';
import { Pagination } from '@/shared/ui/pagination';

import { ActivityCard } from './activity-card';
import { PROJECTS } from '../lib/data';

import type { ActivityCategory } from '../lib/types';

type ActivityListProps = {
  category: ActivityCategory;
};

export function ActivityList({ category }: ActivityListProps) {
  /* 최신순 정렬 */
  const filtered = PROJECTS.filter((p) => p.category === category)
    .slice()
    .sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const { page, totalPages, pageItems, setPage } = usePagination({
    items: filtered,
    pageSize: 6,
  });

  if (filtered.length === 0) {
    return (
      <div className="flex w-full items-center justify-center py-16 text-md text-text-default">
        등록된 콘텐츠가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <ul className="grid w-full grid-cols-1 justify-items-center gap-3 lg:grid-cols-[repeat(3,minmax(0,420px))] lg:justify-center lg:gap-6">
        {pageItems.map((activity) => (
          <li key={activity.id} className="w-full">
            <ActivityCard activity={activity} />
          </li>
        ))}
      </ul>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
