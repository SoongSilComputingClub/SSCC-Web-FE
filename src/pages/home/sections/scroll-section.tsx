import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';

import picScroll1 from '@/assets/images/home/pic-scroll1.jpg';
import picScroll2 from '@/assets/images/home/pic-scroll2.jpg';
import picScroll3 from '@/assets/images/home/pic-scroll3.jpg';
import picScroll4 from '@/assets/images/home/pic-scroll4.jpg';
import picScroll5 from '@/assets/images/home/pic-scroll5.jpg';
import picScroll6 from '@/assets/images/home/pic-scroll6.jpg';
import picScroll7 from '@/assets/images/home/pic-scroll7.jpg';
import picScroll8 from '@/assets/images/home/pic-scroll8.jpg';

type ColIndex = 0 | 1 | 2 | 3;

const COL_KEYS = ['col-0', 'col-1', 'col-2', 'col-3'] as const;

export type ParallaxColumnItem = {
  id: string;
  imageSrc: string;
  imageScale?: number;
  col?: ColIndex;
  startYPercent?: number;

  /** 이미지별 추가 파라미터 */
  travelPx?: number; // 직접 지정하면 측정값 대신 사용
  speed?: number; // 0 이상
  strengthPx?: number; // travel 보정(+/-)

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

  textOffsetYPx?: number; // default -24
  smoothFactor?: number; // default 0.08

  /** 성능: 화면 근처일 때만 구동 */
  enableIntersectionGate?: boolean; // default true
};

type Preset = { baseStartY: number; baseSpeed: number };

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
function clamp01(n: number) {
  return clamp(n, 0, 1);
}
function easeOutCubic(t: number) {
  t = clamp01(t);
  return 1 - Math.pow(1 - t, 3);
}

/** col 지정된 아이템은 고정 배치, col 미지정 아이템은 남는 슬롯에 라운드로빈 분배 */
function arrangeColumns(items: Readonly<ParallaxColumnItem[]>) {
  const cols: ParallaxColumnItem[][] = [[], [], [], []];

  const fixed = items.filter((it) => it.col !== undefined) as Array<
    ParallaxColumnItem & { col: ColIndex }
  >;
  const loose = items.filter((it) => it.col === undefined);

  fixed.forEach((it) => cols[it.col].push(it));

  let cursor: ColIndex = 0;
  loose.forEach((it) => {
    cols[cursor].push(it);
    cursor = ((cursor + 1) % 4) as ColIndex;
  });

  return cols;
}

/** 0~1 스크롤 진행도(섹션 내부에서 얼마나 소모됐는지) */
function getScrollProgress(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;

  const scrollRange = Math.max(el.offsetHeight - vh, 0);
  if (scrollRange <= 0) return 0;

  const raw = -rect.top / scrollRange;
  return clamp01(raw);
}

type MeasureCell = {
  travel: number; // 최종 travel(px)
  nodeH: number;
  offsetTop: number;
};

function Parallax4Split({
  title,
  subtitle,
  items,
  sectionHeightVh = 220,
  className = '',
  showDividers = true,
  itemGapPercent = 55,
  textOffsetYPx = -24,
  smoothFactor = 0.08,
  enableIntersectionGate = true,
}: Readonly<Parallax4SplitProps>) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // [col][idx]
  const imgRefs = useRef<Array<Array<HTMLDivElement | null>>>([[], [], [], []]);
  const measureCache = useRef<Array<Array<MeasureCell | null>>>([[], [], [], []]);

  // 스크롤 스무딩 누적값(=lenis/scrollTrigger scrub 느낌)
  const smoothedRef = useRef(0);

  //스크롤 위치 확인
  const p2GoneLogged = useRef(false);

  // 섹션 구동 on/off (intersection gate)
  const activeRef = useRef(true);

  // raf 스케줄링
  const rafIdRef = useRef<number>(0);
  const measureRafRef = useRef<number>(0);

  const cols = useMemo(() => arrangeColumns(items), [items]);

  const presets: Preset[] = useMemo(
    () => [
      { baseStartY: 72, baseSpeed: 1 },
      { baseStartY: 10, baseSpeed: 1 },
      { baseStartY: 58, baseSpeed: 1 },
      { baseStartY: 52, baseSpeed: 1 },
    ],
    [],
  );

  const scheduleTick = () => {
    if (rafIdRef.current) return;
    rafIdRef.current = globalThis.requestAnimationFrame(tick);
  };

  const scheduleMeasure = () => {
    if (measureRafRef.current) return;
    measureRafRef.current = globalThis.requestAnimationFrame(() => {
      measureRafRef.current = 0;
      measureAll();
      scheduleTick();
    });
  };

  const measureAll = () => {
    const el = wrapRef.current;
    if (!el) return;

    const vh = window.innerHeight;
    const titleSafePx = vh * 0.28 + 160;

    for (let colI = 0; colI < 4; colI++) {
      const colItems = cols[colI] ?? [];
      for (let itemI = 0; itemI < colItems.length; itemI++) {
        const node = imgRefs.current[colI]?.[itemI];
        if (!node) continue;

        const it = colItems[itemI];

        const offsetTop = (node as HTMLElement).offsetTop;
        const nodeH = node.getBoundingClientRect().height;

        const autoTravel = offsetTop + nodeH + titleSafePx;
        const travel = (it.travelPx ?? autoTravel) + (it.strengthPx ?? 0);

        if (!measureCache.current[colI]) measureCache.current[colI] = [];
        measureCache.current[colI][itemI] = { travel, nodeH, offsetTop };
      }
    }
  };

  const applyNodeStyle = (node: HTMLElement, y: number) => {
    node.style.transform = `translate3d(0, ${y}px, 0)`;
    node.style.opacity = '1';
  };

  const checkP2GoneOnce = (itId: string | undefined, node: HTMLElement) => {
    if (itId !== 'p2') return;
    if (p2GoneLogged.current) return;

    const r = node.getBoundingClientRect();
    if (r.bottom >= 0) return;

    p2GoneLogged.current = true;
  };

  const getItemMotion = (
    colI: number,
    itemI: number,
    preset: { baseSpeed: number },
    it: { speed?: number; id?: string } | undefined,
    s: number,
  ) => {
    const speed = Math.max(0, it?.speed ?? preset.baseSpeed);
    const travel = measureCache.current[colI]?.[itemI]?.travel ?? 0;
    const y = -s * travel * speed;
    return { y, speed };
  };

  const processColumn = (colI: number, s: number) => {
    const preset = presets[colI] ?? presets[0];
    const colItems = cols[colI] ?? [];

    for (let itemI = 0; itemI < colItems.length; itemI++) {
      const node = imgRefs.current[colI]?.[itemI];
      if (!node) continue;

      const it = colItems[itemI];
      const { y } = getItemMotion(colI, itemI, preset, it, s);

      applyNodeStyle(node, y);
      checkP2GoneOnce(it.id, node);
    }
  };

  const shouldContinue = (easedTarget: number) =>
    Math.abs(easedTarget - smoothedRef.current) > 0.0008;

  const tick = () => {
    rafIdRef.current = 0;

    const el = wrapRef.current;
    if (!el) return;
    if (enableIntersectionGate && !activeRef.current) return;

    const target = getScrollProgress(el);
    const easedTarget = easeOutCubic(target);

    const k = clamp(smoothFactor, 0.01, 0.35);
    smoothedRef.current += (easedTarget - smoothedRef.current) * k;

    const s = smoothedRef.current;

    for (let colI = 0; colI < 4; colI++) {
      processColumn(colI, s);
    }

    if (shouldContinue(easedTarget)) scheduleTick();
  };

  // 스크롤/리사이즈는 raf 예약만
  useEffect(() => {
    const onScroll = () => scheduleTick();
    const onResize = () => {
      // 리사이즈 시 측정값 무조건 갱신
      scheduleMeasure();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cols, presets, smoothFactor]);

  // 최초/이미지 로드 시 측정
  useLayoutEffect(() => {
    scheduleMeasure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cols]);

  // 섹션이 화면 근처일 때만 구동 (옵션)
  useEffect(() => {
    if (!enableIntersectionGate) return;

    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        activeRef.current = !!e?.isIntersecting;
        if (activeRef.current) {
          scheduleMeasure();
          scheduleTick();
        }
      },
      { root: null, rootMargin: '300px 0px', threshold: 0.01 },
    );

    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableIntersectionGate, cols]);

  return (
    <section
      ref={wrapRef}
      className={`relative w-full ${className}`}
      style={{ height: `${sectionHeightVh}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 텍스트 레이어 */}
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
          <div
            className="mx-auto max-w-6xl px-6"
            style={{ transform: `translate3d(0, ${textOffsetYPx}px, 0)` }}
          >
            <div className="text-xl font-extrabold leading-none tracking-tight text-text-default">
              {title}
            </div>
            {subtitle ? (
              <div className="mx-auto mt-4 max-w-xl text-sm leading-snug text-text-default/80">
                {subtitle}
              </div>
            ) : null}
          </div>
        </div>

        {/* 사진 레이어 */}
        <div className="absolute inset-0 z-10">
          <div className="mx-auto h-full max-w-6xl px-6">
            <div className="relative h-full">
              {/* ✅ Dividers overlay (양끝 포함) */}
              {showDividers ? (
                <div className="pointer-events-none absolute inset-0 z-20">
                  {[0, 25, 50, 75, 100].map((left) => (
                    <div
                      key={`divider-${left}`}
                      className="absolute top-0 h-full w-[3px]"
                      style={{
                        left: `${left}%`,
                        transform: left === 100 ? 'translateX(-1px)' : undefined,
                        background:
                          'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 20%, rgba(255,255,255,0.18) 80%, rgba(255,255,255,0) 100%)',
                      }}
                    />
                  ))}
                </div>
              ) : null}

              <div className="grid h-full grid-cols-4">
                {cols.map((colItems, colI) => {
                  const preset = presets[colI] ?? presets[0];

                  return (
                    <div
                      key={COL_KEYS[colI] ?? `col-${colI}`}
                      className="relative h-full overflow-hidden"
                    >
                      {colItems.map((it, itemI) => {
                        const startY =
                          it.startYPercent ?? preset.baseStartY + itemI * itemGapPercent;
                        const size = it.sizeClassName ?? 'w-full max-w-[150px] md:max-w-[220px]';
                        const scale = it.imageScale ?? 1.12;

                        return (
                          <div
                            key={it.id}
                            ref={(node) => {
                              if (!imgRefs.current[colI]) imgRefs.current[colI] = [];
                              imgRefs.current[colI][itemI] = node;
                            }}
                            className="absolute w-full opacity-0 will-change-transform"
                            style={{ top: `${startY}%` }}
                          >
                            <div className={`mx-auto overflow-hidden px-2 ${size}`}>
                              <img
                                src={it.imageSrc}
                                alt=""
                                aria-hidden="true"
                                className="h-auto w-full object-contain"
                                style={{
                                  transform: `scale(${scale})`,
                                  transformOrigin: 'center',
                                  willChange: 'transform',
                                }}
                                onLoad={scheduleMeasure}
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
      </div>
    </section>
  );
}

// 사용 예시
export default function ParallaxSection() {
  return (
    <main className="bg-black pt-20">
      <Parallax4Split
        title="당신의 성장에"
        subtitle="SSCC가 함께합니다"
        sectionHeightVh={255} //255
        itemGapPercent={55}
        textOffsetYPx={-10}
        smoothFactor={0.08}
        enableIntersectionGate={true}
        items={[
          {
            id: 'p1',
            col: 0,
            startYPercent: 150,
            speed: 1.1,
            imageSrc: picScroll1,
          },
          {
            id: 'p2',
            col: 0,
            startYPercent: 300,
            speed: 0.88,
            imageSrc: picScroll2,
          },
          {
            id: 'p3',
            col: 1,
            startYPercent: 100,
            speed: 1.3,
            imageSrc: picScroll3,
          },
          {
            id: 'p4',
            col: 1,
            startYPercent: 200,
            speed: 1,
            imageSrc: picScroll4,
          },
          {
            id: 'p5',
            col: 2,
            startYPercent: 200,
            speed: 1.2,
            imageSrc: picScroll5,
          },
          {
            id: 'p6',
            col: 2,
            startYPercent: 400,
            speed: 1.15,
            imageSrc: picScroll6,
          },
          {
            id: 'p7',
            col: 3,
            startYPercent: 120,
            speed: 0.95,
            imageSrc: picScroll7,
          },
          {
            id: 'p8',
            col: 3,
            startYPercent: 400,
            speed: 1,
            imageSrc: picScroll8,
          },
        ]}
      />
    </main>
  );
}
