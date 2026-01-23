import { useEffect, useRef, useState } from 'react';

type TimelineItem = {
  id: string;
  yearTitle: string;
  desc: string;
};

const TIMELINE_ITEMS: TimelineItem[] = [
  { id: 't1', yearTitle: '1983년 창설', desc: '숭실대 최초 컴퓨터 중앙 동아리로 출발' },
  { id: 't2', yearTitle: '20XX년 명칭 변경', desc: '숭실대 최초 컴퓨터 중앙 동아리로 출발' },
  { id: 't3', yearTitle: '2025년', desc: '회원 150명, 5개 대학 연합 동아리 UNICOSA 활동' },
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
        <div className="absolute -left-1 top-6 h-[calc(100%+2rem)] w-px bg-point" />
      ) : null}

      {/* ✅ 텍스트만 한 번에 등장 */}
      <div
        className={[
          'transition-all duration-700 ease-out will-change-transform',
          allVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
        ].join(' ')}
      >
        <p className="text-[15px] font-semibold leading-none text-text-default">{item.yearTitle}</p>
        <p className="mt-2 whitespace-pre-line text-[12px] text-text-default/30">{item.desc}</p>
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
        <div className="mb-8 pt-6 text-center text-[25px] font-bold text-text-default">
          동아리 연혁
        </div>

        <div className="relative flex flex-col gap-8">
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
