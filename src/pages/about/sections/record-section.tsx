import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type RecordItem = {
  id: string;
  title: string;
  value: number; // ✅ 숫자만
  unit: string; // ✅ 단위만 ("명", "개")
  durationMs?: number;
};

function easeOutQuint(t: number) {
  return 1 - Math.pow(1 - t, 5);
}

const STEPS = 120;

function calcDelay(durationMs: number, step: number, steps: number) {
  return Math.round((durationMs * step) / steps);
}

function calcNextValue(targetValue: number, step: number, steps: number) {
  const t = step / steps;
  const eased = easeOutQuint(t);
  return Math.round(targetValue * eased);
}

function clearTimers(timersRef: React.MutableRefObject<number[]>) {
  timersRef.current.forEach((id) => globalThis.clearTimeout(id));
  timersRef.current = [];
}

function scheduleCountUpForRecord(params: {
  record: RecordItem;
  recordIndex: number;
  steps: number;
  pushTimer: (id: number) => void;
  updateValueAtIndex: (index: number, nextValue: number) => void;
}) {
  const { record, recordIndex, steps, pushTimer, updateValueAtIndex } = params;

  const durationMs = record.durationMs ?? 900;
  const targetValue = record.value;

  for (let step = 1; step <= steps; step += 1) {
    const delay = calcDelay(durationMs, step, steps);

    const timerId = globalThis.setTimeout(() => {
      const nextValue = calcNextValue(targetValue, step, steps);
      updateValueAtIndex(recordIndex, nextValue);
    }, delay);

    pushTimer(timerId);
  }
}

export default function RecordSection() {
  const records = useMemo<RecordItem[]>(
    () => [
      { id: 'r1', title: '프로젝트', value: 6, unit: '개', durationMs: 1500 },
      { id: 'r2', title: '활동 멤버', value: 153, unit: '명', durationMs: 3500 },
      { id: 'r3', title: '스터디', value: 18, unit: '개', durationMs: 2000 },
    ],
    [],
  );

  const [values, setValues] = useState<number[]>(() => records.map(() => 0));
  const [armed, setArmed] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const startedRef = useRef(false);

  // ✅ setTimeout id들 정리용
  const timersRef = useRef<number[]>([]);

  // ✅ useCallback으로 참조 안정화 (deps 깔끔)
  const updateValueAtIndex = useCallback((index: number, nextValue: number) => {
    setValues((prev) => {
      if (prev[index] === nextValue) return prev;
      const next = [...prev];
      next[index] = nextValue;
      return next;
    });
  }, []);

  const startCountUpOnce = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    clearTimers(timersRef);

    records.forEach((record, recordIndex) => {
      scheduleCountUpForRecord({
        record,
        recordIndex,
        steps: STEPS,
        updateValueAtIndex,
        pushTimer: (id) => timersRef.current.push(id),
      });
    });
  }, [records, updateValueAtIndex]);

  useEffect(() => {
    const onFirstScroll = () => setArmed(true);
    window.addEventListener('scroll', onFirstScroll, { once: true, passive: true });
    return () => window.removeEventListener('scroll', onFirstScroll);
  }, []);

  useEffect(() => {
    if (!armed) return;

    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        startCountUpOnce();
        io.disconnect(); // ✅ 한 번만
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    io.observe(el);

    return () => {
      io.disconnect();
      clearTimers(timersRef);
    };
  }, [armed, startCountUpOnce]);

  return (
    <section
      ref={sectionRef}
      className={[
        'flex w-full items-center justify-center bg-bg-default px-6',
        // ✅ snap 영향 차단(가능한 한)
        'snap-none [scroll-snap-align:none] [scroll-snap-stop:normal]',
        // ✅ 스크롤 앵커링/레이아웃 격리
        '[contain:layout_paint] [overflow-anchor:none]',
      ].join(' ')}
    >
      <div className="flex w-full max-w-[420px] flex-col gap-4 py-20 text-center text-text-default sm:max-w-[800px] sm:gap-12">
        <div className="text-sm font-bold sm:text-xl">43기 활동 레코드</div>

        <div className="flex flex-row items-center justify-center gap-4">
          {records.map((it, idx) => (
            <div
              key={it.id}
              className={[
                'flex aspect-square w-28 flex-col items-center justify-center rounded-2xl bg-bg-muted text-text-default sm:w-80',
                idx === 0 ? 'bg-bg-muted/80' : '',
              ].join(' ')}
            >
              <div className="translate-y-[-70%] text-xs font-semibold leading-none text-text-default/60 sm:text-lg">
                {it.title}
              </div>

              {/* ✅ 숫자만 카운트업, 단위는 고정 */}
              <div className="mt-2 whitespace-nowrap text-sm tabular-nums leading-snug sm:text-2xl">
                <span className="inline-block min-w-[4ch] text-center">{values[idx]}</span>
                <span className="text-text-default/80">{it.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
