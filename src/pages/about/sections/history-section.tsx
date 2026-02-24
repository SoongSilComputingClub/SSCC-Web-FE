import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type TimelineItem = {
  id: string;
  yearTitle: string;
  desc?: string;
};

const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 't1',
    yearTitle: '1983년 11월: S.J.C.C 창단',
    desc: '27명의 인원과 함께 "숭전 컴퓨터 클럽" 출발',
  },
  { id: 't2', yearTitle: '1984년 3월', desc: '제 1회 세미나 진행' },
  { id: 't3', yearTitle: '1985년 4월', desc: '서클 공식 인가' },
  { id: 't4', yearTitle: '1985년 5월', desc: 'UNICOSA 가입' },
  {
    id: 't5',
    yearTitle: '1987년 3월: 개칭',
    desc: '교명 환원으로 개칭 숭실 컴퓨터 서클 (S.S.C.C)',
  },
  { id: 't6', yearTitle: '2026년 2월', desc: 'SSCC 44기 모집 시작' },
];

function TimelineRow({
  item,
  allVisible,
}: Readonly<{
  item: TimelineItem;
  allVisible: boolean;
}>) {
  return (
    <div
      className={[
        'transition-all duration-700 ease-out will-change-transform',
        allVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
      ].join(' ')}
    >
      <p className="pt-3 text-sm font-semibold leading-none text-text-default sm:text-md">
        {item.yearTitle}
      </p>
      <p className="mt-1 whitespace-pre-line text-xs text-text-default/40 sm:text-base">
        {item.desc}
      </p>
    </div>
  );
}

function WaveSeparator({ top }: Readonly<{ top: number }>) {
  return (
    <div
      className="pointer-events-none absolute translate-y-5 sm:translate-y-7"
      style={{ top, left: -8 }}
      aria-hidden="true"
    >
      <svg className="block" width="10" height="8" viewBox="0 0 20 12" preserveAspectRatio="none">
        <path
          d="M0 6 Q5 2 10 6 T20 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M0 9 Q5 5 10 9 T20 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}

export default function HistorySection() {
  const [allVisible, setAllVisible] = useState(false);
  const [lineInsets, setLineInsets] = useState<{ top: number; bottom: number }>({
    top: 0,
    bottom: 0,
  });
  const [separatorTop, setSeparatorTop] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const dotRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const el = sectionRef.current;
    if (el === null) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAllVisible(true); // ✅ 섹션 들어오면 전부 표시
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useLayoutEffect(() => {
    const el = timelineRef.current;
    if (el === null) return;

    const measure = () => {
      const first = dotRefs.current[TIMELINE_ITEMS[0]?.id ?? ''];
      const lastItem = TIMELINE_ITEMS.at(-1);
      const last = dotRefs.current[lastItem?.id ?? ''];
      if (first === null || last === null) return;

      const parentRect = el.getBoundingClientRect();
      const firstRect = first.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();

      const firstCenterY = firstRect.top + firstRect.height / 2;
      const lastCenterY = lastRect.top + lastRect.height / 2;

      const topInset = Math.max(0, firstCenterY - parentRect.top);
      const bottomInset = Math.max(0, parentRect.bottom - lastCenterY);

      setLineInsets({ top: topInset, bottom: bottomInset });

      const t5 = dotRefs.current['t5'];
      const t6 = dotRefs.current['t6'];
      if (t5 !== null && t6 !== null) {
        const t5r = t5.getBoundingClientRect();
        const t6r = t6.getBoundingClientRect();
        const t5CenterY = t5r.top + t5r.height / 2;
        const t6CenterY = t6r.top + t6r.height / 2;
        const midY = (t5CenterY + t6CenterY) / 2;
        setSeparatorTop(Math.max(0, midY - parentRect.top));
      } else {
        setSeparatorTop(null);
      }
    };

    measure();
    window.addEventListener('resize', measure);

    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <section className="bg-bg-default px-8 pb-16 pt-8">
      <div
        ref={sectionRef}
        className="relative mx-auto w-full max-w-3xl rounded-2xl bg-bg-muted px-6 pb-10"
      >
        <div className="mb-4 pt-6 text-center text-xl font-bold text-text-default sm:mb-8">
          동아리 연혁
        </div>

        <div ref={timelineRef} className="relative flex flex-col gap-5">
          {/* continuous vertical line for the whole timeline */}
          <div
            className="pointer-events-none absolute left-[-4px] w-px bg-point"
            style={{ top: lineInsets.top + 12, bottom: lineInsets.bottom + 2 }}
          />
          {separatorTop !== null ? (
            <div className="text-text-default/60">
              <WaveSeparator top={separatorTop} />
            </div>
          ) : null}
          {TIMELINE_ITEMS.map((item) => {
            return (
              <div
                key={item.id}
                className={['relative pl-2', item.id === 't6' ? 'mt-2' : ''].join(' ')}
              >
                {/* dot */}
                <div
                  ref={(node) => {
                    dotRefs.current[item.id] = node;
                  }}
                  className="absolute -left-3 top-2.5 z-10 size-4 rounded-full border-2 border-point bg-bg-white"
                />

                <div className="flex flex-col">
                  <TimelineRow item={item} allVisible={allVisible} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
