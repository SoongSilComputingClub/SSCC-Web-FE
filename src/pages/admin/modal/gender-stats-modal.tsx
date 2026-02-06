import { useMemo } from 'react';

import { BaseModal } from '@/shared/ui/base-modal';

import type { Row } from '../index';

type GenderStatsModalProps = {
  isOpen: boolean;
  rows: Row[];
  onClose: () => void;
};

type GenderKey = '남성' | '여성' | '미기재';

type GenderShownKey = '남성' | '여성';

const GENDER_KEYS: GenderShownKey[] = ['남성', '여성'];

const GENDER_COLORS: Record<GenderShownKey, string> = {
  남성: '#16c7b3',
  여성: '#ffd400',
};

export function GenderStatsModal({ isOpen, rows, onClose }: GenderStatsModalProps) {
  const { items, pieBackground } = useMemo(() => {
    const acc: Record<GenderKey, number> = { 남성: 0, 여성: 0, 미기재: 0 };

    rows.forEach((r) => {
      const raw = r.gender;

      if (raw === '남' || raw === '남성') acc.남성 += 1;
      else if (raw === '여' || raw === '여성') acc.여성 += 1;
      else acc.미기재 += 1;
    });

    const total = Object.values(acc).reduce((s, n) => s + n, 0);

    const list = GENDER_KEYS.map((label) => {
      const count = acc[label];
      const percent = total === 0 ? 0 : Math.round((count / total) * 100);
      return { label, count, percent, color: GENDER_COLORS[label] };
    }).filter((x) => x.count > 0);

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

    return { items: list, pieBackground: bg };
  }, [rows]);

  return (
    <BaseModal isOpen={isOpen} title="성별 비율" onClose={onClose}>
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
    </BaseModal>
  );
}
