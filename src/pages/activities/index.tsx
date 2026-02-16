import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

import { ActivityList } from './components/activity-list';
import { ActivityTabs } from './components/activity-tabs';

import type { ActivityCategory } from './lib/types';

const CATEGORIES = ['news', 'activity', 'social'] as const;
const DEFAULT_CATEGORY: ActivityCategory = 'news';

export default function ActivitiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = useMemo<ActivityCategory>(() => {
    const tab = searchParams.get('tab');
    if (!tab) return DEFAULT_CATEGORY;

    return (CATEGORIES as readonly string[]).includes(tab)
      ? (tab as ActivityCategory)
      : DEFAULT_CATEGORY;
  }, [searchParams]);

  const handleChangeCategory = (next: ActivityCategory) => {
    setSearchParams((prev) => {
      const sp = new URLSearchParams(prev);
      sp.set('tab', next);
      sp.set('page', '1');
      return sp;
    });
  };

  return (
    <section className="w-full px-6 py-8">
      <ActivityTabs category={category} onChange={handleChangeCategory} />

      <div className="mt-6">
        <ActivityList category={category} />
      </div>
    </section>
  );
}
