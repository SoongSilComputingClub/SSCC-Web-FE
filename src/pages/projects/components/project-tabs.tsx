import type { ProjectCategory } from "../lib/types";

type ProjectTabsProps = {
  category: ProjectCategory;

  /* 탭을 클릭했을 때 선택 카테고리를 바꾸기 위한 콜백 */
  onChange: (next: ProjectCategory) => void;
};

export function ProjectTabs({ category, onChange }: ProjectTabsProps) {
  const tabs: Array<{ key: ProjectCategory; label: string }> = [
    { key: "news" as ProjectCategory, label: "뉴스" },
    { key: "activity" as ProjectCategory, label: "대외활동" },
    { key: "social" as ProjectCategory, label: "친목" },
  ];

  return (
    <div className="w-full pt-8">
      <div
        role="tablist"
        aria-label="프로젝트 카테고리"
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
                "inline-flex h-[33px] w-[90px] items-center justify-center rounded-2xl text-sm font-semibold transition " +
                (isActive
                  ? "bg-point text-text-black shadow-sm"
                  : "bg-black text-point border border-point hover:text-text-default")
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