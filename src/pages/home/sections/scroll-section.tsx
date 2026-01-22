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
function ease_out_cubic(t: number) {
  t = clamp01(t);
  return 1 - Math.pow(1 - t, 3);
}

/** col 지정된 아이템은 고정 배치, col 미지정 아이템은 남는 슬롯에 라운드로빈 분배 */
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
    cursor = ((cursor + 1) % 4) as ColIndex;
  });

  return cols;
}

/** 0~1 스크롤 진행도(섹션 내부에서 얼마나 소모됐는지) */
function get_scroll_progress(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;

  const scroll_range = Math.max(el.offsetHeight - vh, 0);
  if (scroll_range <= 0) return 0;

  const raw = -rect.top / scroll_range;
  return clamp01(raw);
}

type MeasureCell = {
  travel: number; // 최종 travel(px)
  node_h: number;
  offset_top: number;
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
}: Parallax4SplitProps) {
  const wrap_ref = useRef<HTMLDivElement | null>(null);

  // [col][idx]
  const img_refs = useRef<Array<Array<HTMLDivElement | null>>>([[], [], [], []]);
  const measure_cache = useRef<Array<Array<MeasureCell | null>>>([[], [], [], []]);

  // 스크롤 스무딩 누적값(=lenis/scrollTrigger scrub 느낌)
  const smoothed_ref = useRef(0);

  //스크롤 위치 확인
  const p2_gone_logged = useRef(false);

  // 섹션 구동 on/off (intersection gate)
  const active_ref = useRef(true);

  // raf 스케줄링
  const raf_id_ref = useRef<number>(0);
  const measure_raf_ref = useRef<number>(0);

  const cols = useMemo(() => arrange_columns(items), [items]);

  const presets: Preset[] = useMemo(
    () => [
      { baseStartY: 72, baseSpeed: 1.0 },
      { baseStartY: 10, baseSpeed: 1.0 },
      { baseStartY: 58, baseSpeed: 1.0 },
      { baseStartY: 52, baseSpeed: 1.0 },
    ],
    [],
  );

  // cols 바뀌면 refs/caches 초기화(인덱스 꼬임 방지)
  // useEffect(() => {
  //   img_refs.current = [[], [], [], []];
  //   measure_cache.current = [[], [], [], []];
  // }, [cols]);

  const schedule_tick = () => {
    if (raf_id_ref.current) return;
    raf_id_ref.current = window.requestAnimationFrame(tick);
  };

  const schedule_measure = () => {
    if (measure_raf_ref.current) return;
    measure_raf_ref.current = window.requestAnimationFrame(() => {
      measure_raf_ref.current = 0;
      measure_all();
      schedule_tick();
    });
  };

  const measure_all = () => {
    const el = wrap_ref.current;
    if (!el) return;

    const vh = window.innerHeight;
    const title_safe_px = vh * 0.28 + 160;

    for (let col_i = 0; col_i < 4; col_i++) {
      const col_items = cols[col_i] ?? [];
      for (let item_i = 0; item_i < col_items.length; item_i++) {
        const node = img_refs.current[col_i]?.[item_i];
        if (!node) continue;

        const it = col_items[item_i];

        const offset_top = (node as HTMLElement).offsetTop;
        const node_h = node.getBoundingClientRect().height;

        const auto_travel = offset_top + node_h + title_safe_px;
        const travel = (it.travelPx ?? auto_travel) + (it.strengthPx ?? 0);

        if (!measure_cache.current[col_i]) measure_cache.current[col_i] = [];
        measure_cache.current[col_i][item_i] = { travel, node_h, offset_top };
      }
    }
  };

  const tick = () => {
    raf_id_ref.current = 0;

    const el = wrap_ref.current;
    if (!el) return;
    if (enableIntersectionGate && !active_ref.current) return;

    const target = get_scroll_progress(el);
    const eased_target = ease_out_cubic(target);

    const k = clamp(smoothFactor, 0.01, 0.35);
    smoothed_ref.current += (eased_target - smoothed_ref.current) * k;
    const s = smoothed_ref.current;

    for (let col_i = 0; col_i < 4; col_i++) {
      const preset = presets[col_i] ?? presets[0];
      const col_items = cols[col_i] ?? [];

      for (let item_i = 0; item_i < col_items.length; item_i++) {
        const node = img_refs.current[col_i]?.[item_i];
        if (!node) continue;

        const it = col_items[item_i];
        const speed = Math.max(0, it.speed ?? preset.baseSpeed);

        const cached = measure_cache.current[col_i]?.[item_i];
        const travel = cached?.travel ?? 0;

        const y = -s * travel * speed;

        node.style.transform = `translate3d(0, ${y}px, 0)`;
        node.style.opacity = '1';

        if (it.id === 'p2' && !p2_gone_logged.current) {
          const r = node.getBoundingClientRect();
          const is_gone = r.bottom < 0; // 완전히 위로 나감

          if (is_gone) {
            p2_gone_logged.current = true;
            console.log('[p2 gone] s =', s, 'target =', target, 'eased =', eased_target);
          }
        }
      }
    }

    // 아직 차이가 남아있으면 다음 프레임도 계속(=스크럽 계속 따라가기)
    if (Math.abs(eased_target - smoothed_ref.current) > 0.0008) {
      schedule_tick();
    }
  };

  // 스크롤/리사이즈는 raf 예약만
  useEffect(() => {
    const on_scroll = () => schedule_tick();
    const on_resize = () => {
      // 리사이즈 시 측정값 무조건 갱신
      schedule_measure();
    };

    window.addEventListener('scroll', on_scroll, { passive: true });
    window.addEventListener('resize', on_resize);

    return () => {
      window.removeEventListener('scroll', on_scroll);
      window.removeEventListener('resize', on_resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cols, presets, smoothFactor]);

  // 최초/이미지 로드 시 측정
  useLayoutEffect(() => {
    schedule_measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cols]);

  // 섹션이 화면 근처일 때만 구동 (옵션)
  useEffect(() => {
    if (!enableIntersectionGate) return;

    const el = wrap_ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        active_ref.current = !!e?.isIntersecting;
        if (active_ref.current) {
          schedule_measure();
          schedule_tick();
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
      ref={wrap_ref}
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
            <div className="text-[27px] md:text-5xl font-extrabold tracking-tight leading-none text-text-default">
              {title}
            </div>
            {subtitle ? (
              <div className="mt-4 text-[15px] md:text-xl max-w-xl mx-auto leading-snug text-text-default/80">
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
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={`divider-${i}`}
                      className="absolute top-0 h-full w-[3px]"
                      style={{
                        left: `${(i * 100) / 4}%`, // 0%, 25%, 50%, 75%, 100%
                        transform: i === 4 ? 'translateX(-1px)' : undefined, // 100% 라인이 밖으로 밀리는 것 방지(선 두께 보정)
                        background:
                          'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 20%, rgba(255,255,255,0.18) 80%, rgba(255,255,255,0) 100%)',
                      }}
                    />
                  ))}
                </div>
              ) : null}

              <div className="grid h-full grid-cols-4">
                {cols.map((col_items, col_i) => {
                  const preset = presets[col_i] ?? presets[0];

                  return (
                    <div key={`col-${col_i}`} className="relative h-full overflow-hidden">

                      {col_items.map((it, item_i) => {
                        const start_y =
                          it.startYPercent ?? preset.baseStartY + item_i * itemGapPercent;
                        const size = it.sizeClassName ?? 'w-full max-w-[150px] md:max-w-[220px]';

                        const scale = it.imageScale ?? 1.12;

                        return (
                          <div
                            key={it.id}
                            ref={(node) => {
                              if (!img_refs.current[col_i]) img_refs.current[col_i] = [];
                              img_refs.current[col_i][item_i] = node;
                            }}
                            className="absolute w-full will-change-transform opacity-0"
                            style={{ top: `${start_y}%` }}
                          >
                            <div className={`mx-auto pl-2 pr-2 overflow-hidden ${size}`}>
                              <img
                                src={it.imageSrc}
                                alt=""
                                aria-hidden="true"
                                className="w-full h-auto object-contain"
                                style={{
                                  transform: `scale(${scale})`,
                                  transformOrigin: 'center',
                                  willChange: 'transform',
                                }}
                                onLoad={schedule_measure}
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
            speed: 1.0,
            imageSrc: picScroll8,
          },
        ]}
      />
    </main>
  );
}
