import { useEffect, useRef, useState } from 'react';

export default function ValueSection() {
  const items = [
    {
      id: '1',
      title: '도전',
      desc: '당장 모르는 기술 앞에서도 \n주저하지 않고 부딪혀보며, \n성장통마저 배움의 즐거움으로 \n삼을 수 있는 사람',
      pos: 'translate-x-[60%]',
    },
    {
      id: '2',
      title: '공동체',
      desc: '혼자보다는 "함께" 배우며 시너지를 내고, \n다양한 사람들과 따뜻한 네트워크를 \n만들어가고 싶은 사람',
      pos: 'translate-x-[33%] lg:translate-x-[40%]',
    },
    {
      id: '3',
      title: '몰입',
      desc: '일상의 작은 불편함에도 "왜?"라는 질문을 던지며, \n문제를 해결하기 위해 끈기 있게 몰입할 수 있는 분',
      pos: 'translate-x-[13%]',
    },
  ] as const;

  const [visible, setVisible] = useState<boolean[]>(() => items.map(() => false));
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [armed, setArmed] = useState(false);

  const revealIndex = (idx: number) => {
    setVisible((prev) => {
      if (prev[idx]) return prev;
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  };

  useEffect(() => {
    const onFirstScroll = () => setArmed(true);
    window.addEventListener('scroll', onFirstScroll, { once: true, passive: true });
    return () => window.removeEventListener('scroll', onFirstScroll);
  }, []);

  useEffect(() => {
    if (!armed) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.index);
          if (Number.isNaN(idx)) return;

          if (entry.isIntersecting) {
            revealIndex(idx);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -25% 0px',
      },
    );

    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [armed, items.length]);

  useEffect(() => {
    if (!armed) return;

    const el = headerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true); // 한 번만 등장
      },
      { threshold: 0.05 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [armed]);

  return (
    <section className="relative w-full bg-bg-default">
      <div className="pointer-events-none absolute inset-0 overflow-x-clip">
        <div className="absolute left-[20%] top-[85%] size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-white/35 via-white/15 to-transparent blur-2xl" />
        <div className="absolute left-[80%] top-[15%] size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-bl from-white/35 via-white/15 to-transparent blur-2xl" />
      </div>
      <div className="relative flex min-h-screen w-full flex-col overflow-hidden px-6 py-16">
        <div
          ref={headerRef}
          className={[
            'text-center text-text-default transition-all duration-700 ease-out will-change-transform',
            headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          ].join(' ')}
        >
          <div className="text-sm text-text-default/50 sm:text-md">SSCC의</div>
          <div className="mb-4 text-xl font-bold sm:text-2xl">핵심 가치</div>
          <div className="text-sm text-text-default/70 sm:text-md">
            미래 SSCC 44기와 함께 나아가고 싶은 사람
          </div>
        </div>

        <div className="flex flex-col gap-6 pb-40 pt-28 text-text-default">
          {items.map((it, idx) => {
            const isVisible = visible[idx];

            return (
              <div
                key={it.id}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                data-index={idx}
                className={it.pos}
              >
                <div
                  className={[
                    'transition-all duration-1000 ease-out will-change-transform',
                    isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[18%] opacity-0',
                  ].join(' ')}
                >
                  <div className="p-5">
                    <div className="text-xl font-bold sm:text-2xl">
                      {it.id}. {it.title}
                    </div>
                    <div className="mt-2 h-px w-full bg-text-default/80" />
                    <div className="mt-2 whitespace-pre-line text-xs font-bold text-text-default/50 sm:text-sm">
                      {it.desc}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
