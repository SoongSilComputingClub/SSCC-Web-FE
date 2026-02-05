import type { Project } from '../lib/types';

type Props = {
  project: Project;
};

export function ProjectCard({ project }: Props) {
  return (
    <article className="group mx-auto flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border-default bg-bg-default shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-point/70 hover:ring-2 hover:ring-point/40 hover:shadow-[0_0_0_1px_rgba(48,178,200,0.15),0_16px_48px_rgba(0,0,0,0.45),0_0_24px_rgba(48,178,200,0.45)]">
      {/* 썸네일 이미지 */}
      <div className="p-4 lg:p-3">
        <div className="aspect-[2] w-full overflow-hidden rounded-2xl lg:aspect-[16/9]">
          <img
            src={project.thumbnailSrc}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-1 flex-col px-3 pb-3 lg:pb-2">
        {/* 프로젝트 제목 */}
        <h3 className="text-sm font-bold leading-snug text-text-default lg:text-base">
          {project.title}
        </h3>

        {/* 타입 라벨 (예: APP / WEB / EVENT 등) */}
        <p className="text-2xs font-medium uppercase tracking-wide text-text-placeholder lg:text-xs">
          {project.typeLabel}
        </p>

        {/* 짧은 소개 문구 */}
        <p className="mt-3 whitespace-pre-line text-xs font-medium leading-relaxed text-text-default lg:mt-1 lg:text-sm">
          {project.content}
        </p>

        {/* 날짜가 있을 때만 표시 */}
        {project.date && (
          <time className="mt-auto block text-right text-xs font-medium text-text-placeholder lg:text-sm">
            {project.date}
          </time>
        )}
      </div>
    </article>
  );
}
