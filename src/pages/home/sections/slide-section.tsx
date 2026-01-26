import { useEffect, useMemo, useRef, useState } from 'react';

import picSide1 from '@/assets/images/home/pic-side1.jpg';
import picSide2 from '@/assets/images/home/pic-side2.jpg';
import picSide3 from '@/assets/images/home/pic-side3.jpg';

type Slide = {
  id: string;
  subtitle: string;
  title: string;
  title2: string;
  className?: string;
  bgSrc: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function SlideIndicator({
  activeIndex,
  total,
  progress,
}: {
  activeIndex: number;
  total: number;
  progress: number; // 0~1
}) {
  const current = activeIndex + 1;

  return (
    <div className="mt-4 flex w-full flex-col">
      <div className="self-start text-center text-[12px] font-semibold text-white/80">
        [{current}/{total}]
      </div>

      <div className="mt-2 h-[2px] w-full overflow-hidden bg-text-default/25">
        <div className="h-full bg-text-default" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}

export default function ScrollSnapSlides() {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: 's1',
        subtitle: '지향점 1',
        title: '함께 배우고 나누며',
        title2: '성장하는 동아리',
        className: 'bg-bg-default text-text-default',
        bgSrc: picSide1,
      },
      {
        id: 's2',
        subtitle: '지향점 2',
        title: '끊임없는 도전으로',
        title2: '가치를 증명하는 곳',
        className: 'bg-bg-default text-text-default',
        bgSrc: picSide2,
      },
      {
        id: 's3',
        subtitle: '지향점 3',
        title: '서로를 밀어주고',
        title2: '함께 완주하는 동아리',
        className: 'bg-bg-default text-text-default',
        bgSrc: picSide3,
      },
    ],
    [],
  );

  const wrapRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [vw, setVw] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 0));

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let raf = 0;

    const calcScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      const scrollRange = Math.max(el.offsetHeight - vh, 0);
      const startOffset = vh * 0.25;

      const scrolledRaw = -rect.top - startOffset;
      const scrolled = clamp(scrolledRaw, 0, scrollRange);

      const p = scrollRange <= 0 ? 1 : scrolled / scrollRange;
      setScrollProgress(clamp(p, 0, 1));

      const len = slides.length;
      const step = len > 0 ? scrollRange / len : 0;
      const idx = step <= 0 ? 0 : Math.min(len - 1, Math.floor(scrolled / step));
      setActiveIndex(idx);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calcScroll);
    };

    const onResize = () => {
      setVw(window.innerWidth);
      onScroll();
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [slides.length]);

  const wrapperHeight = `${slides.length * 120}vh`;
  const trackWidth = `${slides.length * vw}px`;
  const trackTransform = `translate3d(-${activeIndex * vw}px, 0, 0)`;

  return (
    <div ref={wrapRef} className="relative w-full" style={{ height: wrapperHeight }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 슬라이드 트랙 */}
        <div
          className="relative z-10 flex h-full transition-transform duration-700 ease-in-out will-change-transform"
          style={{
            width: trackWidth,
            transform: trackTransform,
          }}
        >
          {slides.map((s) => (
            <section
              key={s.id}
              className={`relative flex h-full w-screen items-start justify-start px-6 pt-32 ${
                s.className ?? ''
              }`}
            >
              <div className="relative mx-auto my-7 flex h-[65%] w-[70%] justify-center overflow-hidden">
                <img
                  src={s.bgSrc}
                  alt=""
                  aria-hidden="true"
                  className="size-full object-cover object-center"
                />
              </div>

              <div className="absolute z-10 max-w-sm text-text-default drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
                <div className="pb-4 text-[12px]">{s.subtitle}</div>
                <div className="text-[27px] font-bold">{s.title}</div>
                <div className="pl-8 text-[27px] font-bold leading-tight">{s.title2}</div>
              </div>
            </section>
          ))}
        </div>

        {/* 인디케이터 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-20 z-20 mx-auto flex w-[70%] justify-center">
          <SlideIndicator
            activeIndex={activeIndex}
            total={slides.length}
            progress={scrollProgress}
          />
        </div>
      </div>
    </div>
  );
}
