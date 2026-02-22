import { useEffect, useMemo, useRef } from 'react';

import { useLocation, useNavigationType, useSearchParams } from 'react-router-dom';

import { ActivityList } from './components/activity-list';
import { ActivityTabs } from './components/activity-tabs';

import type { ActivityCategory } from './lib/types';

const CATEGORIES = ['news', 'academics', 'events'] as const;
const DEFAULT_CATEGORY: ActivityCategory = 'news';

export default function ActivitiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const navigationType = useNavigationType();
  const didMountRef = useRef(false);

  useEffect(() => {
    // 첫 렌더에서는 스크롤을 강제로 움직이지 않음
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    // 뒤로가기/앞으로가기(POP)에서는 기존 스크롤 복원이 더 자연스러움
    if (navigationType === 'POP') return;

    // 렌더가 끝난 뒤 스크롤 이동
    const raf = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });

    return () => cancelAnimationFrame(raf);
  }, [location.search, navigationType]);

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
