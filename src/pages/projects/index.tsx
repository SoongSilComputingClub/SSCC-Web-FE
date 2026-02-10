import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

import { ProjectList } from './components/project-list';
import { ProjectTabs } from './components/project-tabs';

import type { ProjectCategory } from './lib/types';

const CATEGORIES = ['news', 'activity', 'social'] as const;
const DEFAULT_CATEGORY: ProjectCategory = 'news';

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = useMemo<ProjectCategory>(() => {
    const tab = searchParams.get('tab');
    if (!tab) return DEFAULT_CATEGORY;

    return (CATEGORIES as readonly string[]).includes(tab)
      ? (tab as ProjectCategory)
      : DEFAULT_CATEGORY;
  }, [searchParams]);

  const handleChangeCategory = (next: ProjectCategory) => {
    setSearchParams((prev) => {
      const sp = new URLSearchParams(prev);
      sp.set('tab', next);
      sp.set('page', '1');
      return sp;
    });
  };

  return (
    <section className="w-full px-6 py-8">
      <ProjectTabs category={category} onChange={handleChangeCategory} />

      <div className="mt-6">
        <ProjectList category={category} />
      </div>
    </section>
  );
}
