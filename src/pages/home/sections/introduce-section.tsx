import { useMemo, useRef, useEffect } from 'react';

import { NavLink } from 'react-router-dom';

import logoGradi from '@/assets/images/home/logo-gradi.png';
import picIntro1 from '@/assets/images/home/pic-intro1.jpg';
import picIntro2 from '@/assets/images/home/pic-intro2.jpg';
import picIntro3 from '@/assets/images/home/pic-intro3.jpeg';
import picIntro4 from '@/assets/images/home/pic-intro4.jpg';
import picScroll1 from '@/assets/images/home/pic-scroll1.jpg';
import picScroll2 from '@/assets/images/home/pic-scroll2.jpg';
import picScroll3 from '@/assets/images/home/pic-scroll3.jpg';
import picScroll4 from '@/assets/images/home/pic-scroll4.jpg';
import picScroll5 from '@/assets/images/home/pic-scroll5.jpg';

type CardItem = {
  id: string;
  title: string;
  subtitle?: string;
  desc: string;
  imageSrc?: string;
};

type TwoByTwoCardsSectionProps = {
  items: CardItem[]; // 4개 권장
  className?: string;
};

function TwoByTwoCardsSection({ items, className = '' }: TwoByTwoCardsSectionProps) {
  const data = items.slice(0, 4);

  return (
    <section className={`w-full bg-bg-white text-text-default ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
          {data.map((it) => {
            const Wrapper = 'div';
            return (
              <Wrapper
                key={it.id}
                className={[
                  'group relative overflow-hidden rounded-2xl',
                  'bg-bg-default',
                  'dutation-300 transition-[filter]',
                  'brightness-120 hover:brightness-65',
                  'aspect-square w-full',
                ].join(' ')}
              >
                {/* background image */}
                {it.imageSrc ? (
                  <img
                    src={it.imageSrc}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 size-full object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-55"
                  />
                ) : null}

                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-point/30 via-point/15 to-transparent group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-b from-point/30 via-bg-default/15 to-transparent opacity-0 group-hover:opacity-100" />

                {/* content */}
                <div className="relative z-10 size-full">
                  <div
                    className={[
                      'absolute left-1/2 mt-2 -translate-x-1/2',
                      'text-center text-[12px] font-extrabold text-text-default',
                      'w-20 rounded-[10px] border border-bg-white bg-bg-white/50 py-1',
                    ].join(' ')}
                  >
                    {/* 기본: title */}
                    <div
                      className={[
                        'transition-all duration-300',
                        'translate-y-0 opacity-100',
                        'group-hover:-translate-y-1 group-hover:opacity-0',
                      ].join(' ')}
                    >
                      {it.title}
                    </div>

                    {/* hover: subtitle */}
                    <div
                      className={[
                        'absolute inset-0 flex items-center justify-center', // ✅ 같은 박스 안, 같은 중앙
                        'transition-all duration-300',
                        'translate-y-1 opacity-0',
                        'group-hover:translate-y-0 group-hover:opacity-100',
                      ].join(' ')}
                    >
                      {it.subtitle}
                    </div>
                  </div>

                  {it.desc ? (
                    <div
                      className={[
                        'absolute inset-0 z-10',
                        'flex items-center justify-center', // ✅ 카드 정중앙
                        'pointer-events-none',
                      ].join(' ')}
                    >
                      <div
                        className={[
                          'w-[95%] text-center text-[12px] text-text-default',
                          'whitespace-pre-line leading-snug',
                          'transition-all duration-300',
                          'translate-y-3 opacity-0',
                          'group-hover:translate-y-0 group-hover:opacity-100',
                        ].join(' ')}
                      >
                        {it.desc}
                      </div>
                    </div>
                  ) : null}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

type MarqueeItem = {
  id: string;
  src: string;
  alt?: string;
};

type MarqueeProps = {
  items: MarqueeItem[];

  /** px 단위: 클수록 빠름 (기본 80) */
  speedPxPerSec?: number;

  /** ✅ 카드 한 변(px) (정사각형 고정) */
  cardSizePx?: number; // default 220

  /** 카드 사이 간격(px) */
  gapPx?: number; // default 18

  /** 섹션 높이 */
  heightClassName?: string; // default "h-[240px]"
  className?: string;

  /** ✅ 관성 마찰(0~1). 작을수록 더 오래 미끄러짐 */
  friction?: number; // default 0.92

  /** ✅ 클릭 핸들러(선택) */
  onItemClick?: (item: MarqueeItem) => void;
};

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function AutoSlideMarquee({
  items,
  speedPxPerSec = 80,
  cardSizePx = 220,
  gapPx = 18,
  heightClassName = 'h-[240px]',
  className = '',
  friction = 0.92,
  onItemClick,
}: MarqueeProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // 끊김 방지: 트랙을 2번 이어붙임
  const track = useMemo(() => [...items, ...items], [items]);

  // 루프 기준 트랙 길이(원본 1회분)
  const trackWidth = items.length * (cardSizePx + gapPx);

  const offsetRef = useRef(0); // translateX용 offset
  const velocityRef = useRef(0); // 관성 속도(px/s)

  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastTRef = useRef(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const el = trackRef.current;
    if (!viewport || !el) return;

    let raf = 0;
    let last = performance.now();

    const render = () => {
      if (trackWidth <= 0) return;
      // offset을 trackWidth로 래핑 → 끊김없는 무한루프
      const wrapped = -mod(-offsetRef.current, trackWidth);
      el.style.transform = `translate3d(${wrapped}px, 0, 0)`;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;

      // ✅ 자동 루프: 항상 왼쪽으로 이동
      offsetRef.current -= speedPxPerSec * dt;

      // ✅ 드래그 중이 아니면 관성 적용
      if (!draggingRef.current) {
        offsetRef.current += velocityRef.current * dt;
        velocityRef.current *= Math.pow(friction, dt * 60);
        if (Math.abs(velocityRef.current) < 2) velocityRef.current = 0;
      }

      render();
      raf = requestAnimationFrame(tick);
    };

    const onPointerDown = (e: PointerEvent) => {
      draggingRef.current = true;
      lastXRef.current = e.clientX;
      lastTRef.current = performance.now();
      velocityRef.current = 0;

      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;

      const now = performance.now();
      const dx = e.clientX - lastXRef.current;
      const dtMs = Math.max(1, now - lastTRef.current);

      // ✅ 드래그 이동 반영
      offsetRef.current += dx;

      // ✅ 관성 추정
      velocityRef.current = (dx / dtMs) * 1000;

      lastXRef.current = e.clientX;
      lastTRef.current = now;

      render();
    };

    const onPointerUp = () => {
      draggingRef.current = false;
    };

    // 드래그 시 스크롤 충돌 줄이기
    viewport.style.touchAction = 'pan-y';
    viewport.style.userSelect = 'none';
    viewport.style.cursor = 'grab';

    const onEnter = () => (viewport.style.cursor = draggingRef.current ? 'grabbing' : 'grab');
    const onLeave = () => (viewport.style.cursor = 'grab');

    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove);
    viewport.addEventListener('pointerup', onPointerUp);
    viewport.addEventListener('pointercancel', onPointerUp);
    viewport.addEventListener('pointerleave', onPointerUp);
    viewport.addEventListener('mouseenter', onEnter);
    viewport.addEventListener('mouseleave', onLeave);

    render();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      viewport.removeEventListener('pointerdown', onPointerDown);
      viewport.removeEventListener('pointermove', onPointerMove);
      viewport.removeEventListener('pointerup', onPointerUp);
      viewport.removeEventListener('pointercancel', onPointerUp);
      viewport.removeEventListener('pointerleave', onPointerUp);
      viewport.removeEventListener('mouseenter', onEnter);
      viewport.removeEventListener('mouseleave', onLeave);
    };
  }, [trackWidth, speedPxPerSec, friction]);

  return (
    <section className={`w-full bg-bg-white ${className}`}>
      <div ref={viewportRef} className={`relative w-full overflow-hidden ${heightClassName}`}>
        <div className="absolute left-0 top-1/2 w-full -translate-y-1/2">
          <div
            ref={trackRef}
            className="flex items-center will-change-transform"
            style={{ gap: `${gapPx}px` }}
          >
            {track.map((it, idx) => (
              <button
                key={`${it.id}-${idx}`}
                type="button"
                onClick={() => onItemClick?.(it)}
                className="shrink-0 overflow-hidden rounded-xl"
                style={{ width: `200px`, height: `${cardSizePx}px` }}
              >
                {/* ✅ 고정 카드 꽉 채움 */}
                <img
                  src={it.src}
                  alt={it.alt ?? ''}
                  draggable={false}
                  className="size-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function IntroSection() {
  return (
    <section>
      <div className="relative h-screen w-full overflow-hidden">
        {/* ✅ 배경: 위→아래 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black to-white" />

        {/* ✅ 이미지: 맨 아래, 가로 꽉 */}
        <img
          src={logoGradi}
          alt=""
          aria-hidden="true"
          className="absolute inset-x-0 bottom-48 z-10 block h-auto w-full"
        />
      </div>
      <div className="relative flex flex-col items-center">
        <div className="mt-10 text-xl font-semibold text-text-black">
          SSCC는 이런 활동을 진행합니다.
        </div>
        <TwoByTwoCardsSection
          items={[
            {
              id: 'c1',
              title: '세미나',
              subtitle: 'seminar',
              desc: 'SSCC 출신 선배가 직접 \n전하는 생생한 업계 현황과 \n핵심 기술을 배우며 \n실무 감각을 깨우는 시간',
              imageSrc: picIntro1,
            },
            {
              id: 'c2',
              title: '프로젝트',
              subtitle: 'project',
              desc: '아이디어를 서비스로 구현하는 \n협업의 여정. 팀원과 소통하며 \n완성도 높은 결과물을 일굽니다',
              imageSrc: picIntro2,
            },
            {
              id: 'c3',
              title: '스터디',
              subtitle: 'study',
              desc: '기초부터 심화까지 함께하는 \n몰입의 시간. 함께 지식을 나누며 \n기본기를 다지는 과정',
              imageSrc: picIntro3,
            },
            {
              id: 'c4',
              title: '행사',
              subtitle: 'event',
              desc: '선후배가 어우러지는 소통의 장',
              imageSrc: picIntro4,
            },
          ]}
        />
      </div>
      <div className="my-20 text-center text-xl font-semibold text-text-black">
        더 다양한 SSCC의 소식이 궁금하다면!
      </div>
      <AutoSlideMarquee
        items={[
          { id: 'm1', src: picScroll1 },
          { id: 'm2', src: picScroll2 },
          { id: 'm3', src: picScroll3 },
          { id: 'm4', src: picScroll4 },
          { id: 'm5', src: picScroll5 },
        ]}
        speedPxPerSec={50} // ✅ 속도
        cardSizePx={270} // ✅ 정사각형 카드 한 변
        gapPx={22}
        heightClassName="h-[320px]"
      />
      <div className="relative h-80 w-full overflow-hidden">
        {/* ✅ 배경: 위→아래 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-black" />
        <div className="relative z-10 mt-20 flex flex-col items-center">
          <div className="text-xl font-bold text-text-black">이런 SSCC에 흥미가 생긴다면</div>
          <NavLink
            to="/apply"
            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })}
            className="mt-10 shrink-0 rounded-full border-[1.5px] border-point bg-bg-muted px-20 py-3 text-[13px] font-semibold text-point"
          >
            지금 바로 지원하기
          </NavLink>
        </div>
      </div>
    </section>
  );
}
