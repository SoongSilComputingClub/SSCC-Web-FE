import { BaseModal } from '@/shared/ui/base-modal';

import type { Row } from '../index';

type MemberDetailModalProps = {
  isOpen: boolean;
  row: Row | null;
  onClose: () => void;
};

const CODING_EXP_LABEL: Record<string, string> = {
  A: 'A (경험 없음)',
  B: 'B (기초 수준)',
  C: 'C (중급 수준)',
  D: 'D (고급 수준)',
  E: 'E (전문가 수준)',
};

export function MemberDetailModal({ isOpen, row, onClose }: MemberDetailModalProps) {
  if (!isOpen || !row) return null;

  return (
    <BaseModal isOpen={isOpen} title="상세 정보" onClose={onClose}>
      <div className="grid gap-2 text-sm text-text-default/80">
        {/* 기본 정보 */}
        <Item label="이름" value={row.name} />
        <Item label="학과" value={row.major} />
        <Item label="학번" value={row.studentId} />
        <Item label="학년" value={String(row.grade)} />
        <Item label="성별" value={row.gender} />
        <Item label="연락처" value={row.phone} />

        {/* 지원 정보 */}
        {row.codingExp && (
          <Item label="코딩 경험" value={CODING_EXP_LABEL[row.codingExp] ?? row.codingExp} />
        )}
        {row.techStackText && <Item label="기술 스택" value={row.techStackText} />}

        {/* 장문 텍스트 */}
        {row.introduce && <LongItem label="자기소개" value={row.introduce} />}
        {row.wantedValue && <LongItem label="원하는 가치" value={row.wantedValue} />}
        {row.aspiration && <LongItem label="포부" value={row.aspiration} />}

        {/* 면접 가능 시간 */}
        {row.interviewTimes && row.interviewTimes.length > 0 && (
          <div className="mt-2 rounded-2xl bg-bg-white/5 px-4 py-3">
            <span className="text-text-default/60">면접 가능 시간</span>

            {(() => {
              const grouped = row.interviewTimes.reduce<Record<string, string[]>>((acc, t) => {
                const key = t.date;
                const time = `${t.startTime} ~ ${t.endTime}`;
                (acc[key] ??= []).push(time);
                return acc;
              }, {});

              const dates = Object.keys(grouped).sort();

              return (
                <div className="mt-2 grid gap-3">
                  {dates.map((date) => (
                    <div key={date} className="text-sm text-text-default">
                      <div>📅 {date}</div>
                      <div className="mt-1 grid gap-1 pl-5">
                        {grouped[date].map((time, i) => (
                          <div key={`${date}-${i}`}> {time}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </BaseModal>
  );
}

/** 한 줄 항목 (label - value 가로 배치) */
function Item({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-bg-white/5 px-4 py-3">
      <span className="text-text-default/60">{label}</span>
      <span className="font-bold text-text-default/90">{value}</span>
    </div>
  );
}

/** 장문 항목 (label 위, value 아래 세로 배치) */
function LongItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-bg-white/5 px-4 py-3">
      <span className="text-text-default/60">{label}</span>
      <p className="mt-1 whitespace-pre-wrap text-text-default/90">{value}</p>
    </div>
  );
}
