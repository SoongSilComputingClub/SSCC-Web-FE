import { useEffect, useMemo, useRef, useState } from 'react';

type RecordItem = {
  id: string;
  title: string;
  value: number;
  unit: string;
  durationMs?: number;
};

function easeOutQuint(t: number) {
  return 1 - Math.pow(1 - t, 5);
}

const STEPS = 120;

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
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((id) => globalThis.clearTimeout(id));
    timersRef.current = [];
  };

  const updateValueAtIndex = (index: number, nextValue: number) => {
    setValues((prev) => {
      if (prev[index] === nextValue) return prev;
      const next = [...prev];
      next[index] = nextValue;
      return next;
    });
  };

  const scheduleCountUp = () => {
    records.forEach((rec, index) => {
      const durationMs = rec.durationMs ?? 900;
      const targetValue = rec.value;

      for (let step = 1; step <= STEPS; step += 1) {
        const delay = Math.round((durationMs * step) / STEPS);

        const timerId = globalThis.setTimeout(() => {
          const t = step / STEPS;
          const nextValue = Math.round(targetValue * easeOutQuint(t));
          updateValueAtIndex(index, nextValue);
        }, delay);

        timersRef.current.push(timerId);
      }
    });
  };

  const startCountUpOnce = () => {
    if (startedRef.current) return;
    startedRef.current = true;

    clearTimers();
    scheduleCountUp();
  };

  useEffect(() => {
    const onFirstScroll = () => setArmed(true);

    // 브라우저에서만 안전하게
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', onFirstScroll, { once: true, passive: true });
      return () => window.removeEventListener('scroll', onFirstScroll);
    }

    return undefined;
  }, []);

  useEffect(() => {
    if (!armed) return;

    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        startCountUpOnce();
        io.disconnect();
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    );

    io.observe(el);

    return () => {
      io.disconnect();
      clearTimers();
    };
  }, [armed, records]);

  return (
    <section
      ref={sectionRef}
      className={[
        'flex w-full items-center justify-center bg-bg-default px-6',
        'snap-none [scroll-snap-align:none] [scroll-snap-stop:normal]',
        '[contain:layout_paint] [overflow-anchor:none]',
      ].join(' ')}
    >
      <div className="flex w-full max-w-[420px] flex-col gap-4 py-20 text-center text-text-default">
        <div className="text-sm font-bold">43기 활동 레코드</div>

        <div className="flex flex-row items-center justify-center gap-4">
          {records.map((it, idx) => (
            <div
              key={it.id}
              className={[
                'flex aspect-square w-28 flex-col items-center justify-center rounded-2xl bg-bg-muted text-text-default',
                idx === 0 ? 'bg-bg-muted/80' : '',
              ].join(' ')}
            >
              <div className="translate-y-[-70%] text-xs font-semibold leading-none text-text-default/60">
                {it.title}
              </div>

              <div className="mt-2 whitespace-nowrap text-sm tabular-nums leading-snug">
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
