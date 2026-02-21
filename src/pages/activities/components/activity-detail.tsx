import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useActivityGallery } from '@/shared/lib/use-activity-gallery';

import { ActivityGallery, type ActivityGallerySlide } from './activity-gallery';

import type { Activity } from '../lib/types';

type ActivityDetailProps = {
  readonly activity: Activity;
};

const scheduleDoubleRaf = (cb: () => void) => {
  let raf1 = 0;
  let raf2 = 0;

  raf1 = requestAnimationFrame(() => {
    raf2 = requestAnimationFrame(cb);
  });

  return () => {
    if (raf1) cancelAnimationFrame(raf1);
    if (raf2) cancelAnimationFrame(raf2);
  };
};

/**
 * 프로젝트 상세 화면
 * - 메인: 큰 대표 이미지
 * - 하단: 갤러리 썸네일 리스트(가로 스크롤)
 * - 본문: 여러 줄 텍스트(개행 유지)
 */
export function ActivityDetail({ activity }: ActivityDetailProps) {
  const {
    images,
    currentIndex,
    currentSrc,
    setIndex,
    goPrev,
    goNext,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
  } = useActivityGallery({
    activityId: activity.id,
    coverImage: activity.coverImage,
    galleryImages: activity.galleryImages,
  });

  const prevIndexRef = useRef<number>(currentIndex);
  const prevSrcRef = useRef<string>(currentSrc);

  const [slide, setSlide] = useState<ActivityGallerySlide>(null);

  const setSlideAnimateOn = () => {
    setSlide((prev) => (prev ? { ...prev, animate: true } : prev));
  };

  useLayoutEffect(() => {
    // 같은 이미지면 애니메이션 불필요
    if (prevSrcRef.current === currentSrc) {
      prevIndexRef.current = currentIndex;
      return;
    }

    const prevIndex = prevIndexRef.current;
    const dir = currentIndex > prevIndex ? 'next' : 'prev';

    // 1) 먼저 "정지 상태"로 렌더
    setSlide({
      fromSrc: prevSrcRef.current,
      toSrc: currentSrc,
      dir,
      animate: false,
    });

    // 다음 change를 위해 이전 값 갱신
    prevIndexRef.current = currentIndex;
    prevSrcRef.current = currentSrc;

    // 2) 다음 페인트 이후에 "이동 상태"로 전환 (더블 rAF로 안정화)
    return scheduleDoubleRaf(setSlideAnimateOn);
  }, [currentIndex, currentSrc]);

  const [coverAspect, setCoverAspect] = useState<number | null>(null);

  const thumbsListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = activity.coverImage;

    img.onload = () => {
      if (img.naturalHeight > 0) {
        setCoverAspect(img.naturalWidth / img.naturalHeight);
      }
    };

    return () => {
      // onload 콜백 정리 (프로젝트 바뀔 때 안전)
      img.onload = null;
    };
  }, [activity.coverImage]);

  useEffect(() => {
    const listEl = thumbsListRef.current;
    if (!listEl) return;

    const active = listEl.querySelector<HTMLElement>(`[data-thumb-index="${currentIndex}"]`);
    if (!active) return;

    active.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [currentIndex]);

  return (
    <section className="flex w-full flex-col items-center bg-bg-default px-6 pb-16 pt-20 text-text-default">
      {/* 대표 이미지 */}
      <div className="relative w-full max-w-[420px] md:max-w-[480px]">
        <ActivityGallery
          currentSrc={currentSrc}
          title={activity.title}
          slide={slide}
          onSlideEnd={() => setSlide(null)}
          onPrev={goPrev}
          onNext={goNext}
          index={currentIndex}
          total={images.length}
          aspectRatio={coverAspect ?? '4 / 5'}
          maxHeight="55vh"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        />
      </div>

      {/* 갤러리 썸네일 */}
      <ul ref={thumbsListRef} className="mt-5 flex w-full max-w-[640px] gap-3 overflow-x-auto pb-2">
        {images.map((src, idx) => (
          <li key={`${activity.id}-thumb-${idx}`} className="shrink-0" data-thumb-index={idx}>
            <button
              type="button"
              onClick={() => setIndex(idx)}
              aria-label={`${idx + 1}번째 이미지 보기`}
              className={`h-[84px] w-[110px] rounded-sm border-2 ${
                idx === currentIndex ? 'border-point' : 'border-border-default'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-point`}
            >
              <img
                src={src}
                alt=""
                className="h-full w-full rounded-[2px] object-cover"
                loading="lazy"
              />
            </button>
          </li>
        ))}
      </ul>

      {/* 제목 + 본문 영역 */}
      <div className="mt-6 w-full max-w-[720px] px-0 py-0 md:rounded-lg md:bg-white/5 md:px-6 md:py-8 md:shadow-lg">
        {/* 제목 */}
        <h1 className="text-center text-[20px] font-semibold tracking-tight text-white lg:text-lg">
          {activity.title}
        </h1>

        {activity.date && (
          <time dateTime={activity.date} className="mt-2 block text-center text-sm text-gray-300">
            {activity.date}
          </time>
        )}
        <div className="mt-6 h-px w-full bg-white/20" />

        {/* 본문 */}
        <div className="mt-6">
          <p className="whitespace-pre-line text-base leading-relaxed text-gray-100 lg:text-md">
            {activity.content}
          </p>
        </div>
      </div>
    </section>
  );
}
