import { Link } from 'react-router-dom';

import type { Activity } from '../lib/types';

type Props = {
  activity: Activity;
};

export function ActivityCard({ activity }: Props) {
  return (
    <Link to={`/activities/${activity.id}`} className="block">
      <article className="group mx-auto flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border-default bg-bg-default shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-point/70 hover:shadow-[0_0_0_1px_rgba(48,178,200,0.15),0_16px_48px_rgba(0,0,0,0.45),0_0_24px_rgba(48,178,200,0.45)] hover:ring-2 hover:ring-point/40">
        {/* 썸네일 이미지 */}
        <div className="p-4 lg:p-3">
          <div className="aspect-[2] w-full overflow-hidden rounded-2xl lg:aspect-[16/9]">
            <img
              src={activity.coverImage}
              alt={activity.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        {/* 텍스트 영역 */}
        <div className="flex flex-1 flex-col px-3 pb-3 lg:pb-2">
          {/* 프로젝트 제목 */}
          <h3 className="text-sm font-medium leading-snug text-text-default lg:text-md">
            {activity.title}
          </h3>

          {/* 짧은 소개 문구 
          <p className="mt-1 line-clamp-1 pt-1 text-xs-sm font-normal leading-relaxed text-zinc-300 lg:mt-1 lg:text-sm">
            {activity.content}
          </p>
          */}

          {/* 타입 라벨 | 날짜 */}
          <div className="mt-auto flex justify-end pt-1 text-xs font-normal uppercase leading-normal tracking-wide text-zinc-400 lg:text-xs-sm">
            <span>{activity.typeLabel}</span>
            {activity.date && (
              <>
                <span className="mx-1">|</span>
                <time>{activity.date}</time>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
