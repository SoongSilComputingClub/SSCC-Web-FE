import type { ActivityCategory } from '../lib/types';

type ActivityTabsProps = {
  readonly category: ActivityCategory;

  /* 탭을 클릭했을 때 선택 카테고리를 바꾸기 위한 콜백 */
  onChange: (next: ActivityCategory) => void;
};

export function ActivityTabs({ category, onChange }: ActivityTabsProps) {
  const tabs: Array<{ key: ActivityCategory; label: string }> = [
    { key: 'news' as ActivityCategory, label: '뉴스' },
    { key: 'academics' as ActivityCategory, label: '학술' },
    { key: 'events' as ActivityCategory, label: '행사' },
  ];

  return (
    <div className="w-full">
      <div
        role="tablist"
        aria-label="활동 내역 카테고리"
        className="flex w-full justify-center gap-6"
      >
        {tabs.map((tab) => {
          const isActive = tab.key === category;

          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.key)}
              className={
                'inline-flex h-[33px] w-[90px] items-center justify-center rounded-2xl text-sm font-semibold transition ' +
                (isActive
                  ? 'bg-point text-text-black shadow-sm'
                  : 'border border-point bg-black text-point hover:text-text-default')
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
