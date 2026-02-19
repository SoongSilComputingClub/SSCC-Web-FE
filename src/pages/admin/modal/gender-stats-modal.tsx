import { useEffect, useMemo, useState } from 'react';

import { readGenderDistribution, type GenderDistributionData } from '@/shared/api/admin-api';
import { BaseModal } from '@/shared/ui/base-modal';

type GenderStatsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type GenderShownKey = '남성' | '여성';

const GENDER_COLORS: Record<GenderShownKey, string> = {
  남성: '#16c7b3',
  여성: '#ffd400',
};

export function GenderStatsModal({ isOpen, onClose }: GenderStatsModalProps) {
  const [data, setData] = useState<GenderDistributionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await readGenderDistribution();
        setData(result.data);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : '조회 실패');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isOpen]);

  const { items, pieBackground } = useMemo(() => {
    if (!data) return { items: [], pieBackground: 'rgba(255,255,255,0.08)' };

    const raw: { label: GenderShownKey; count: number; percent: number; color: string }[] = [];

    if (data.maleCount > 0) {
      raw.push({
        label: '남성',
        count: data.maleCount,
        percent: Math.round(data.malePercentage),
        color: GENDER_COLORS['남성'],
      });
    }

    if (data.femaleCount > 0) {
      raw.push({
        label: '여성',
        count: data.femaleCount,
        percent: Math.round(data.femalePercentage),
        color: GENDER_COLORS['여성'],
      });
    }

    const { stops, endAt } = raw.reduce(
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

    return { items: raw, pieBackground: bg };
  }, [data]);

  return (
    <BaseModal isOpen={isOpen} title="성별 비율" onClose={onClose}>
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
          <div className="flex w-full items-center justify-center">
            <div
              className="size-64 rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.10)]"
              style={{ background: pieBackground }}
              aria-label="gender-pie"
            />
          </div>

          <div className="flex w-full items-center justify-center gap-10">
            {items.map((it) => (
              <div key={it.label} className="flex items-center gap-3 text-sm text-text-default/75">
                <span className="size-3 rounded-full" style={{ background: it.color }} />
                <span>
                  {it.label} {it.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </BaseModal>
  );
}
