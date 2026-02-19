import { useEffect, useMemo, useState } from 'react';

import { readCodingExpDistribution, type CodingExpDistributionData } from '@/shared/api/admin-api';
import { BaseModal } from '@/shared/ui/base-modal';

type CodingStatsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type CodingExp = 'A' | 'B' | 'C' | 'D' | 'E';

const CODING_COLORS: Record<CodingExp, string> = {
  D: '#16c7b3',
  C: '#3f7cff',
  B: '#ff4ab0',
  A: '#ffa500',
  E: '#ffd400',
};

export function CodingStatsModal({ isOpen, onClose }: CodingStatsModalProps) {
  const [data, setData] = useState<CodingExpDistributionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await readCodingExpDistribution();
        setData(result.data);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : '조회 실패');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isOpen]);

  const { items, total, donutBackground } = useMemo(() => {
    if (!data) return { items: [], total: 0, donutBackground: 'rgba(255,255,255,0.08)' };

    const list = data.distributions
      .filter((d) => d.count > 0)
      .map((d) => ({
        label: d.level,
        description: d.description,
        count: d.count,
        percent: +d.percentage.toFixed(1),
        color: CODING_COLORS[d.level as CodingExp] ?? '#888',
      }));

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

    return { items: list, total: data.totalCount, donutBackground: bg };
  }, [data]);

  return (
    <BaseModal isOpen={isOpen} title="코딩 경험" onClose={onClose}>
      {isLoading && (
        <div className="flex items-center justify-center py-10 text-sm text-text-default/50">
          로딩 중...
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center py-10 text-sm text-red-400">{error}</div>
      )}

      {data && !isLoading && (
        <div className="grid gap-6">
          {/* Donut Chart */}
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

          {/* Table */}
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
      )}
    </BaseModal>
  );
}
