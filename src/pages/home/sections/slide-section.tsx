import { useEffect, useMemo, useRef, useState } from 'react';

type Slide = {
  id: string;
  subtitle: string;
  title: string;
  title2: string;
  className?: string;
  bgSrc: string;
};

function SlideIndicator({ active_index, total }: { active_index: number; total: number }) {
  const current = active_index + 1;
  const progress = total <= 1 ? 1 : current / total;

  return (
    <div className="mt-4 w-full flex flex-col">
      <div className="self-start text-center text-[12px] font-semibold text-white/80">
        [{current}/{total}]
      </div>

      <div className="mt-2 h-[2px] w-full bg-text-default/25 overflow-hidden">
        <div
          className="h-full bg-text-default transition-[width] duration-500 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
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
        bgSrc: '/src/assets/images/home/pic-side1.jpg',
      },
      {
        id: 's2',
        subtitle: '지향점 2',
        title: '끊임없는 도전으로',
        title2: '가치를 증명하는 곳',
        className: 'bg-bg-default text-text-default',
        bgSrc: '/src/assets/images/home/pic-side2.jpg',
      },
      {
        id: 's3',
        subtitle: '지향점 3',
        title: '서로를 밀어주고',
        title2: '함께 완주하는 동아리',
        className: 'bg-bg-default text-text-default',
        bgSrc: '/src/assets/images/home/pic-side3.jpg',
      },
    ],
    [],
  );

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [active_index, set_active_index] = useState(0);
  const [vw, set_vw] = useState(() => window.innerWidth);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let raf = 0;

    const on_scroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewport_h = window.innerHeight;

        const scroll_range = Math.max(el.offsetHeight - viewport_h, 0);
        const start_offset = viewport_h * 0.25;

        const scrolled_raw = -rect.top - start_offset;

        const scrolled = Math.min(Math.max(scrolled_raw, 0), scroll_range);
        const step = slides.length > 0 ? scroll_range / slides.length : 2;

        const idx = step <= 0 ? 0 : Math.min(slides.length - 1, Math.floor(scrolled / step));

        set_active_index(idx);
      });
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

  return (
    <div ref={wrapRef} className="relative w-full" style={{ height: wrapper_height }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="relative z-10 flex h-full will-change-transform transition-transform duration-500 ease-out"
          style={{
            width: `${slides.length * vw}px`,
            transform: `translate3d(-${active_index * vw}px, 0, 0)`,
          }}
        >
          {slides.map((s) => (
            <section
              key={s.id}
              className={`h-full w-screen pt-32 flex items-start justify-start px-6 ${s.className ?? ''}`}
            >
              <div className="relative w-[70%] h-[65%] flex justify-center mx-auto my-7 overflow-hidden">
                <div className="relative inset-0 z-0">
                  <img
                    src={s.bgSrc}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="absolute z-10 max-w-sm text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
                <div className="text-[12px] pb-4">{s.subtitle}</div>
                <div className="text-3xl font-bold">{s.title}</div>
                <div className="text-3xl pl-8 font-bold leading-tight">{s.title2}</div>
              </div>
            </section>
          ))}
        </div>

        <div className="mx-auto w-[70%] pointer-events-none absolute inset-x-0 bottom-20 z-20 flex justify-center">
          <SlideIndicator active_index={active_index} total={slides.length} />
        </div>
      </div>
    </div>
  );
}
