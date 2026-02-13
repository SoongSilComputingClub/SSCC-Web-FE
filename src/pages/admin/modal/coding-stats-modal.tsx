import { useMemo } from 'react';

import { BaseModal } from '@/shared/ui/base-modal';

import type { Row } from '../index';

type CodingStatsModalProps = {
  isOpen: boolean;
  rows: Row[];
  onClose: () => void;
};

type CodingExp = 'A' | 'B' | 'C' | 'D' | 'E';

const CODING_EXPS: CodingExp[] = ['A', 'B', 'C', 'D', 'E'];

const CODING_COLORS: Record<CodingExp, string> = {
  D: '#16c7b3',
  C: '#3f7cff',
  B: '#ff4ab0',
  A: '#ffa500',
  E: '#ffd400',
};

export function CodingStatsModal({ isOpen, rows, onClose }: CodingStatsModalProps) {
  const { items, total, donutBackground } = useMemo(() => {
    const acc: Record<string, number> = {};
    CODING_EXPS.forEach((k) => (acc[k] = 0));
    acc['미기재'] = 0;

    rows.forEach((r) => {
      // ✅ 서버에서 어떤 값이 와도 여기서 5단계로 정규화 (필요시 매핑 확장)
      const raw = r.codingExp;
      const normalized: CodingExp | '미기재' =
        raw === 'A' || raw === 'B' || raw === 'C' || raw === 'D' || raw === 'E' ? raw : '미기재';

      acc[normalized] = (acc[normalized] ?? 0) + 1;
    });

    const sum = Object.values(acc).reduce((s, n) => s + n, 0);

    const list = CODING_EXPS.map((label) => {
      const count = acc[label] ?? 0;
      const percent = sum === 0 ? 0 : +((count / sum) * 100).toFixed(1);
      return { label, count, percent, color: CODING_COLORS[label] };
    }).filter((x) => x.count > 0);

    // ✅ donut conic-gradient 생성
    const { stops, endAt } = list.reduce(
      (state, it) => {
        const start = state.endAt;
        const end = state.endAt + it.percent;

        return {
          stops: [...state.stops, `${it.color} ${start}% ${end}%`],
          endAt: end,
        };
      },
      { stops: [] as string[], endAt: 0 },
    );

    const finalStops = endAt < 100 ? [...stops, `rgba(255,255,255,0.08) ${endAt}% 100%`] : stops;
    const bg = `conic-gradient(${finalStops.join(',')})`;

    return { items: list, total: sum, donutBackground: bg };
  }, [rows]);

  return (
    <BaseModal isOpen={isOpen} title="코딩 경험" onClose={onClose}>
      <div className="grid gap-6">
        {/* ✅ Donut Chart */}
        <div className="flex w-full items-center justify-center">
          <div className="relative size-56">
            <div className="size-56 rounded-full" style={{ background: donutBackground }} />
            <div className="absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0f0f0f] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <div className="text-sm text-white/45">참여자 수</div>
              <div className="mt-1 text-4xl font-extrabold text-white/90">{total}</div>
            </div>
          </div>
        </div>

        {/* ✅ Table (Label / Value / %) */}
        <div className="w-full">
          <div className="grid grid-cols-[1fr_80px_80px] gap-2 px-2 text-xs text-white/45">
            <div>레이블</div>
            <div className="text-right">값</div>
            <div className="text-right">%</div>
          </div>
          <div className="mt-2 h-px w-full bg-white/10" />

          <div className="mt-3 grid gap-3">
            {items.map((it) => (
              <div
                key={it.label}
                className="grid grid-cols-[1fr_80px_80px] items-center gap-2 px-2 text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="size-3 rounded-full" style={{ background: it.color }} />
                  <span className="text-white/80">{it.label}</span>
                </div>

                <div className="text-right font-bold text-white/90">{it.count}</div>
                <div className="text-right text-white/70">{it.percent.toFixed(1)}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
