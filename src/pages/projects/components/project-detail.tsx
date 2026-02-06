import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useProjectGallery } from '@/shared/lib/use-project-gallery';

import { ProjectGallery, type ProjectGallerySlide } from './project-gallery';

import type { Project } from '../lib/types';

type ProjectDetailProps = {
  project: Project;
};

/**
 * 프로젝트 상세 화면
 * - 메인: 큰 대표 이미지
 * - 하단: 갤러리 썸네일 리스트(가로 스크롤)
 * - 본문: 여러 줄 텍스트(개행 유지)
 */
export function ProjectDetail({ project }: ProjectDetailProps) {
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
  } = useProjectGallery({
    projectId: project.id,
    coverImage: project.coverImage,
    galleryImages: project.galleryImages,
  });

  const prevIndexRef = useRef<number>(currentIndex);
  const prevSrcRef = useRef<string>(currentSrc);

  const [slide, setSlide] = useState<ProjectGallerySlide>(null);

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

    // 2) 다음 페인트 이후에 "이동 상태"로 전환 (더블 rAF로 안정화)
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setSlide((s) => (s ? { ...s, animate: true } : s));
      });
    });

    // 다음 change를 위해 이전 값 갱신
    prevIndexRef.current = currentIndex;
    prevSrcRef.current = currentSrc;

    return () => {
      if (raf1) cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [currentIndex, currentSrc]);

  const [coverAspect, setCoverAspect] = useState<number | null>(null);

  const thumbsListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = project.coverImage;

    img.onload = () => {
      if (img.naturalHeight > 0) {
        setCoverAspect(img.naturalWidth / img.naturalHeight);
      }
    };

    return () => {
      // onload 콜백 정리 (프로젝트 바뀔 때 안전)
      img.onload = null;
    };
  }, [project.coverImage]);

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
      <div className="relative w-full max-w-[520px]">
        <ProjectGallery
          currentSrc={currentSrc}
          title={project.title}
          slide={slide}
          onSlideEnd={() => setSlide(null)}
          onPrev={goPrev}
          onNext={goNext}
          canPrev={currentIndex > 0}
          canNext={currentIndex < images.length - 1}
          index={currentIndex}
          total={images.length}
          aspectRatio={coverAspect ?? '4 / 5'}
          maxHeight="70vh"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        />
      </div>

      {/* 제목 */}
      <h1 className="mt-8 text-center text-xl font-semibold tracking-tight text-text-default">
        {project.title}
      </h1>
      {project.date && (
        <time dateTime={project.date} className="mt-2 block text-center text-sm text-text-default">
          {project.date}
        </time>
      )}

      {/* 갤러리 썸네일 */}
      <ul ref={thumbsListRef} className="mt-5 flex w-full max-w-[640px] gap-3 overflow-x-auto pb-2">
        {images.map((src, idx) => (
          <li key={`${project.id}-thumb-${idx}`} className="shrink-0" data-thumb-index={idx}>
            <img
              src={src}
              alt=""
              onClick={() => setIndex(idx)}
              className={`h-[84px] w-[110px] cursor-pointer rounded-sm border-2 object-cover ${
                idx === currentIndex ? 'border-point' : 'border-border-default'
              }`}
              loading="lazy"
            />
          </li>
        ))}
      </ul>

      {/* 본문 */}
      <div className="mt-10 w-full max-w-[680px]">
        <p className="whitespace-pre-line text-sm leading-relaxed text-text-default">
          {project.content}
        </p>
      </div>
    </section>
  );
}
