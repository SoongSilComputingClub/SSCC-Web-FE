import { useEffect, useMemo, useRef, useState } from 'react';

type ColIndex = 0 | 1 | 2 | 3;

type ParallaxColumnItem = {
  id: string;
  imageSrc: string;

  col?: ColIndex;
  startYPercent?: number;
  travelPx?: number;
  speed?: number;
  strengthPx?: number;

  sizeClassName?: string;
};

type Parallax4SplitProps = {
  title: string;
  subtitle?: string;
  items: ParallaxColumnItem[];
  sectionHeightVh?: number;
  className?: string;
  showDividers?: boolean;
  itemGapPercent?: number;

  /** ✅ 글자 세로 위치 미세 조정(px). 음수=위로, 양수=아래로 */
  textOffsetYPx?: number; // default -24

  /** ✅ 스크롤 스무딩 강도(0~1). 작을수록 더 부드럽고 느리게 따라감 */
  smoothFactor?: number; // default 0.08
};

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

/**
 * col 지정된 아이템은 고정 배치,
 * col 미지정 아이템은 남는 슬롯에 라운드로빈 분배
 */
function arrange_columns(items: ParallaxColumnItem[]) {
  const cols: ParallaxColumnItem[][] = [[], [], [], []];

  const fixed = items.filter((it) => it.col !== undefined) as Array<
    ParallaxColumnItem & { col: ColIndex }
  >;
  const loose = items.filter((it) => it.col === undefined);

  fixed.forEach((it) => cols[it.col].push(it));

  let cursor: ColIndex = 0;
  loose.forEach((it) => {
    cols[cursor].push(it);
    cursor = ((cursor + 1) % 4) as unknown as ColIndex;
  });

  return cols;
}

function ParallaxSectionContainer({
  title,
  subtitle,
  items,
  sectionHeightVh = 220,
  className = '',
  showDividers = true,
  itemGapPercent = 55,
  textOffsetYPx = -24,
  smoothFactor = 0.08,
}: Parallax4SplitProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const imgRefs = useRef<Array<Array<HTMLDivElement | null>>>([[], [], [], []]);

  // 원래 progress (디버그/필요시)
  const [progress01, setProgress01] = useState(0);

  // ✅ 스크롤 보간(부드럽게 따라가기)
  const smoothedRef = useRef(0);

  const cols = useMemo(() => arrange_columns(items), [items]);

  const presets = useMemo(
    () => [
      { baseStartY: 72, baseSpeed: 1.0 },
      { baseStartY: 10, baseSpeed: 1.0 },
      { baseStartY: 58, baseSpeed: 1.0 },
      { baseStartY: 52, baseSpeed: 1.0 },
    ],
    [],
  );

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let raf = 0;

    const update = () => {
      raf = 0;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      const scrollRange = Math.max(el.offsetHeight - vh, 0);
      const scrolled = clamp01(scrollRange <= 0 ? 0 : -rect.top / scrollRange);
      setProgress01(scrolled);

      // ✅ 스무딩: 목표 scrolled를 천천히 따라감
      const k = Math.min(0.35, Math.max(0.01, smoothFactor)); // 안전 클램프
      smoothedRef.current += (scrolled - smoothedRef.current) * k;
      const s = smoothedRef.current;

      // ✅ 끝에서 사진이 "텍스트 위로" 확실히 넘어가게 하는 버퍼
      const title_safe_px = vh * 0.28 + 160;

      for (let colIdx = 0; colIdx < 4; colIdx++) {
        const preset = presets[colIdx] ?? presets[0];
        const colItems = cols[colIdx] ?? [];

        for (let itemIdx = 0; itemIdx < colItems.length; itemIdx++) {
          const node = imgRefs.current[colIdx]?.[itemIdx];
          if (!node) continue;

          const it = colItems[itemIdx];

          const speed = it.speed ?? preset.baseSpeed;

          const offsetTop = (node as HTMLElement).offsetTop;
          const nodeH = node.getBoundingClientRect().height;

          // travelPx 없으면 자동 계산(끝에서 무조건 위로 사라짐)
          const autoTravel = offsetTop + nodeH + title_safe_px;
          const travel = (it.travelPx ?? autoTravel) + (it.strengthPx ?? 0);

          // ✅ 이동(부드러운 s 사용)
          const y = -s * travel * Math.max(0, speed);

          node.style.transform = `translate3d(0, ${y}px, 0)`;
          node.style.opacity = '1'; // 페이드 없음
        }
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [cols, presets, smoothFactor]);

  return (
    <section
      ref={wrapRef}
      className={`relative w-full ${className}`}
      style={{ height: `${sectionHeightVh + 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ✅ 텍스트: 화면 중앙 고정(색 변화 없음) */}
        <div
          data-parallax-text="1"
          className="absolute inset-0 z-20 flex items-center justify-center text-center"
        >
          <div
            className="mx-auto max-w-6xl px-6"
            style={{ transform: `translateY(${textOffsetYPx}px)` }}
          >
            <div className="text-2xl md:text-5xl font-extrabold tracking-tight leading-none text-white">
              {title}
            </div>
            {subtitle ? (
              <div className="mt-4 text-xl md:text-base max-w-xl mx-auto leading-none text-white/80">
                {subtitle}
              </div>
            ) : null}
          </div>
        </div>

        {/* 4 split columns (사진 레이어) */}
        <div className="absolute inset-0 z-10">
          <div className="mx-auto h-full max-w-6xl px-6">
            <div className="grid h-full grid-cols-4">
              {cols.map((colItems, colIdx) => {
                const preset = presets[colIdx] ?? presets[0];

                return (
                  <div key={`col-${colIdx}`} className="relative h-full overflow-hidden">
                    {/* ✅ 컬럼 divider: 위/아래 그라데이션 라인 */}
                    {showDividers && colIdx !== 0 ? (
                      <div
                        className="absolute left-0 top-0 h-full w-px pointer-events-none"
                        style={{
                          background:
                            'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 20%, rgba(255,255,255,0.18) 80%, rgba(255,255,255,0) 100%)',
                        }}
                      />
                    ) : null}

                    {colItems.map((it, itemIdx) => {
                      const startY =
                        it.startYPercent ?? preset.baseStartY + itemIdx * itemGapPercent;
                      const size = it.sizeClassName ?? 'w-full max-w-[150px] md:max-w-[220px]';

                      return (
                        <div
                          key={it.id}
                          ref={(el) => {
                            if (!imgRefs.current[colIdx]) imgRefs.current[colIdx] = [];
                            imgRefs.current[colIdx][itemIdx] = el;
                          }}
                          className="absolute will-change-transform w-full"
                          style={{ top: `${startY}%` }}
                        >
                          <div className={`mx-auto overflow-hidden ${size}`}>
                            <img
                              src={it.imageSrc}
                              alt=""
                              aria-hidden="true"
                              className="w-full h-auto object-contain"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ParallaxSection() {
  return (
    <main className="bg-black pt-20">
      <ParallaxSectionContainer
        title="당신의 성장에"
        subtitle="SSCC가 함께합니다"
        sectionHeightVh={220}
        itemGapPercent={55}
        textOffsetYPx={-10} // ✅ 글자 위치 조절(위/아래)
        smoothFactor={0.08} // ✅ 더 부드럽게: 0.05 / 더 빠르게 반응: 0.12
        items={[
          {
            id: 'p1',
            col: 0,
            startYPercent: 150,
            speed: 1.1,
            imageSrc: '/src/assets/images/home/pic-scroll1.jpg',
          },
          {
            id: 'p2',
            col: 0,
            startYPercent: 300,
            speed: 0.9,
            imageSrc: '/src/assets/images/home/pic-scroll2.jpg',
          },
          {
            id: 'p3',
            col: 1,
            startYPercent: 100,
            speed: 1.3,
            imageSrc: '/src/assets/images/home/pic-scroll3.jpg',
          },
          {
            id: 'p4',
            col: 1,
            startYPercent: 200,
            speed: 0.8,
            imageSrc: '/src/assets/images/home/pic-scroll4.jpg',
          },
          {
            id: 'p5',
            col: 2,
            startYPercent: 200,
            speed: 1.2,
            imageSrc: '/src/assets/images/home/pic-scroll5.jpg',
          },
          {
            id: 'p6',
            col: 2,
            startYPercent: 400,
            speed: 1.15,
            imageSrc: '/src/assets/images/home/pic-scroll6.jpg',
          },
          {
            id: 'p7',
            col: 3,
            startYPercent: 120,
            speed: 0.95,
            imageSrc: '/src/assets/images/home/pic-scroll7.jpg',
          },
          {
            id: 'p8',
            col: 3,
            startYPercent: 400,
            speed: 1.0,
            imageSrc: '/src/assets/images/home/pic-scroll8.jpg',
          },
        ]}
      />
    </main>
  );
}
