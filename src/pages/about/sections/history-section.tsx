import { useEffect, useRef, useState } from 'react';

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
  showLine,
  allVisible,
}: {
  item: TimelineItem;
  showLine: boolean;
  allVisible: boolean;
}) {
  return (
    <div className="relative pl-2">
      {/* dot */}
      <div className="absolute -left-3 top-2.5 z-10 size-4 rounded-full border-2 border-point bg-bg-white" />

      {/* line */}
      {showLine ? (
        <div className="absolute -left-1 top-3 h-[calc(100%+1.25rem)] w-px bg-point" />
      ) : null}

      {/* ✅ 텍스트만 한 번에 등장 */}
      <div
        className={[
          'transition-all duration-700 ease-out will-change-transform',
          allVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
        ].join(' ')}
      >
        <p className="pt-3 text-sm font-semibold leading-none text-text-default sm:text-md">
          {item.yearTitle}
        </p>
        <p className="mt-2 whitespace-pre-line text-xs text-text-default/30 sm:text-md">
          {item.desc}
        </p>
      </div>
    </div>
  );
}

export default function HistorySection() {
  const [allVisible, setAllVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAllVisible(true); // ✅ 섹션 들어오면 전부 표시
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-bg-default px-8 pb-16 pt-8">
      {/* ✅ 이 박스를 관찰 */}
      <div ref={sectionRef} className="relative rounded-2xl bg-bg-muted px-6 pb-10">
        <div className="mb-8 pt-6 text-center text-xl font-bold text-text-default">동아리 연혁</div>

        <div className="relative flex flex-col gap-5">
          {TIMELINE_ITEMS.map((item, idx) => (
            <TimelineRow
              key={item.id}
              item={item}
              showLine={idx !== TIMELINE_ITEMS.length - 1}
              allVisible={allVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
