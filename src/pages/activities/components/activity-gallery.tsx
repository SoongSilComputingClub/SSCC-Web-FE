import { memo } from 'react';
import type { PointerEvent } from 'react';

export type ActivityGallerySlide = null | {
  fromSrc: string;
  toSrc: string;
  dir: 'next' | 'prev';
  animate: boolean;
};

type ActivityGalleryProps = {
  /** 현재 보여줄 이미지 src (slide가 없을 때만 사용) */
  currentSrc: string;

  /** 이미지 alt에 쓰일 제목 */
  title: string;

  /** 애니메이션 상태 */
  slide: ActivityGallerySlide;

  /** 이전/다음 버튼 핸들러 */
  onPrev: () => void;
  onNext: () => void;

  /** 스와이프 핸들러 */
  onPointerDown: (e: PointerEvent) => void;
  onPointerUp: (e: PointerEvent) => void;
  onPointerCancel: (e: PointerEvent) => void;

  /** 인덱스 배지 */
  index: number;
  total: number;

  /** 슬라이드 끝나면 호출해서 slide를 null로 */
  onSlideEnd: () => void;

  aspectRatio: string | number;
  maxHeight?: string;
};

export const ActivityGallery = memo(function ActivityGallery({
  currentSrc,
  title,
  slide,
  onPrev,
  onNext,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  index,
  total,
  onSlideEnd,
  aspectRatio,
  maxHeight,
}: ActivityGalleryProps) {
  let slideTransform: string | undefined;

  if (slide) {
    if (slide.dir === 'next') {
      slideTransform = slide.animate ? 'translateX(-50%)' : 'translateX(0%)';
    } else {
      slideTransform = slide.animate ? 'translateX(0%)' : 'translateX(-50%)';
    }
  }

  return (
    <div
      className="relative w-full overflow-hidden overscroll-x-contain bg-bg-default"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      style={{ aspectRatio, maxHeight, touchAction: 'pan-y' }}
    >
      {/* 메인 이미지 영역 */}
      <div className="relative h-full w-full">
        {slide ? (
          <div
            className="absolute inset-0 flex h-full w-[200%] transition-transform duration-300 ease-out"
            style={{
              transform: slideTransform,
            }}
            onTransitionEnd={(e) => {
              if (e.propertyName !== 'transform') return;
              if (e.target !== e.currentTarget) return;
              onSlideEnd();
            }}
          >
            {slide.dir === 'next' ? (
              <>
                <img
                  src={slide.fromSrc}
                  alt={title}
                  className="h-full w-1/2 object-contain"
                  draggable={false}
                />
                <img
                  src={slide.toSrc}
                  alt={title}
                  className="h-full w-1/2 object-contain"
                  draggable={false}
                />
              </>
            ) : (
              <>
                <img
                  src={slide.toSrc}
                  alt={title}
                  className="h-full w-1/2 object-contain"
                  draggable={false}
                />
                <img
                  src={slide.fromSrc}
                  alt={title}
                  className="h-full w-1/2 object-contain"
                  draggable={false}
                />
              </>
            )}
          </div>
        ) : (
          <img
            src={currentSrc}
            alt={title}
            className="absolute inset-0 h-full w-full object-contain"
            draggable={false}
          />
        )}

        {/* 우상단 인덱스 배지 */}
        <div className="absolute right-3 top-3 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white">
          {Math.min(index + 1, total)} / {total}
        </div>

        {/* 좌/우 화살표 (끝에서 막힘) */}
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/35 px-3 py-2 text-white"
          aria-label="이전 이미지"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={onNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/35 px-3 py-2 text-white"
          aria-label="다음 이미지"
        >
          ›
        </button>
      </div>
    </div>
  );
});
