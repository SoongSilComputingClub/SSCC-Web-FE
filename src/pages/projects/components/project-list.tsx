import { usePagination } from '@/shared/lib/use-pagination';
import { Pagination } from '@/shared/ui/pagination';

import { PROJECTS } from '../lib/data';
import type { ProjectCategory } from '../lib/types';
import { ProjectCard } from './project-card';

type ProjectListProps = {
  category: ProjectCategory;
};

export function ProjectList({ category }: ProjectListProps) {
  const filtered = PROJECTS.filter((p) => p.category === category);

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
        {pageItems.map((project) => (
          <li key={project.id} className="w-full">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
