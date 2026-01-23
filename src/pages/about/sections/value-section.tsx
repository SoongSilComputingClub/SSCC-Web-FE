import { useEffect, useRef, useState } from 'react';

export default function ValueSection() {
  const items = [
    {
      id: '1',
      title: '행동',
      desc: '생각에 머무르지 않고,\n직접 만들고 부딪히며\n성장하는 것을 선택합니다.',
      pos: 'translate-x-[55%]',
    },
    {
      id: '2',
      title: '공동체',
      desc: '혼자 잘하는 사람이 아니라,\n함께 배우고\n서로를 끌어올리는 공동체를 지향합니다.',
      pos: 'translate-x-[25%]',
    },
    {
      id: '3',
      title: '책임',
      desc: '우리가 만든 코드와 선택에 끝까지 책임지는\n개발자가 되고자 합니다.',
      pos: 'translate-0',
    },
  ] as const;

  const [visible, setVisible] = useState<boolean[]>(() => items.map(() => false));
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const onFirstScroll = () => setArmed(true);
    window.addEventListener('scroll', onFirstScroll, { once: true, passive: true });
    return () => window.removeEventListener('scroll', onFirstScroll);
  }, []);

  useEffect(() => {
    if (!armed) return; // ✅ 스크롤 전엔 observer 아예 설치 안 함

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.index);
          if (Number.isNaN(idx)) return;

          if (entry.isIntersecting) {
            setVisible((prev) => {
              if (prev[idx]) return prev;
              const next = [...prev];
              next[idx] = true;
              return next;
            });
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
    <section className="relative flex min-h-screen w-full flex-col bg-bg-default px-6 py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[20%] top-[85%] h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-white/35 via-white/15 to-transparent blur-2xl" />
        <div className="absolute left-[80%] top-[15%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-bl from-white/35 via-white/15 to-transparent blur-2xl" />{' '}
      </div>

      <div
        ref={headerRef}
        className={[
          'text-center text-text-default transition-all duration-700 ease-out will-change-transform',
          headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        ].join(' ')}
      >
        <div className="text-text-default/50">SSCC의</div>
        <div className="mb-4 text-[25px] font-bold">핵심 가치</div>
        <div className="text-[15px] text-text-default/70">
          45기 SSCC가 같이 나아가고 싶은 방향입니다.
        </div>
      </div>

      <div className="flex flex-col gap-6 pt-28 text-text-default">
        {items.map((it, idx) => {
          const isVisible = visible[idx];

          return (
            <div
              key={it.id}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              data-index={idx}
              className={it.pos} // ✅ 네가 잡은 최종 위치 유지
            >
              {/* ✅ 오른쪽에서 등장 */}
              <div
                className={[
                  'transition-all duration-1000 ease-out will-change-transform',
                  isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[18%] opacity-0',
                ].join(' ')}
              >
                <div className="rounded-2xl bg-bg-muted/10 p-6 shadow-lg">
                  <div className="text-[25px] font-semibold">
                    {it.id}. {it.title}
                  </div>
                  <div className="mt-2 h-px w-[120%] bg-text-default/80" />
                  <div className="mt-2 whitespace-pre-line text-[12px] text-text-default/50">
                    {it.desc}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
