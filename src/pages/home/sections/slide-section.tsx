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
  active_index,
  total,
  progress,
}: {
  active_index: number;
  total: number;
  progress: number; // 0~1
}) {
  const current = active_index + 1;

  return (
    <div className="mt-4 w-full flex flex-col">
      <div className="self-start text-center text-[12px] font-semibold text-white/80">
        [{current}/{total}]
      </div>

      <div className="mt-2 h-[2px] w-full bg-text-default/25 overflow-hidden">
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

  const wrap_ref = useRef<HTMLDivElement | null>(null);

  const [active_index, set_active_index] = useState(0);
  const [scroll_progress, set_scroll_progress] = useState(0);
  const [vw, set_vw] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 0));

  useEffect(() => {
    const el = wrap_ref.current;
    if (!el) return;

    let raf = 0;

    const calc_scroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      const scroll_range = Math.max(el.offsetHeight - vh, 0);
      const start_offset = vh * 0.25;

      const scrolled_raw = -rect.top - start_offset;
      const scrolled = clamp(scrolled_raw, 0, scroll_range);

      const p = scroll_range <= 0 ? 1 : scrolled / scroll_range;
      set_scroll_progress(clamp(p, 0, 1));

      const len = slides.length;
      const step = len > 0 ? scroll_range / len : 0;
      const idx = step <= 0 ? 0 : Math.min(len - 1, Math.floor(scrolled / step));
      set_active_index(idx);
    };

    const on_scroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calc_scroll);
    };

    const on_resize = () => {
      set_vw(window.innerWidth);
      on_scroll();
    };

    on_scroll();
    window.addEventListener('scroll', on_scroll, { passive: true });
    window.addEventListener('resize', on_resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', on_scroll);
      window.removeEventListener('resize', on_resize);
    };
  }, [slides.length]);

  const wrapper_height = `${slides.length * 120}vh`;
  const track_width = `${slides.length * vw}px`;
  const track_transform = `translate3d(-${active_index * vw}px, 0, 0)`;

  return (
    <div ref={wrap_ref} className="relative w-full" style={{ height: wrapper_height }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 슬라이드 트랙 */}
        <div
          className="relative z-10 flex h-full will-change-transform transition-transform duration-700 ease-in-out"
          style={{
            width: track_width,
            transform: track_transform,
          }}
        >
          {slides.map((s) => (
            <section
              key={s.id}
              className={`relative h-full w-screen pt-32 flex items-start justify-start px-6 ${
                s.className ?? ''
              }`}
            >
              <div className="relative w-[70%] h-[65%] flex justify-center mx-auto my-7 overflow-hidden">
                <img
                  src={s.bgSrc}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="absolute z-10 max-w-sm text-text-default drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
                <div className="text-[12px] pb-4">{s.subtitle}</div>
                <div className="text-[27px] font-bold">{s.title}</div>
                <div className="text-[27px] pl-8 font-bold leading-tight">{s.title2}</div>
              </div>
            </section>
          ))}
        </div>

        {/* 인디케이터 */}
        <div className="mx-auto w-[70%] pointer-events-none absolute inset-x-0 bottom-20 z-20 flex justify-center">
          <SlideIndicator
            active_index={active_index}
            total={slides.length}
            progress={scroll_progress}
          />
        </div>
      </div>
    </div>
  );
}
