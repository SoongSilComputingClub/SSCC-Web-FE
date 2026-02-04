import { BaseModal } from '@/shared/ui/base-modal';

import type { Row } from '../index';

type MemberDetailModalProps = {
  isOpen: boolean;
  row: Row | null;
  onClose: () => void;
};

export function MemberDetailModal({ isOpen, row, onClose }: MemberDetailModalProps) {
  if (!isOpen || !row) return null;

  return (
    <BaseModal isOpen={isOpen} title="상세 정보" onClose={onClose}>
      <div className="grid gap-2 text-sm text-text-default/80">
        <Item label="이름" value={row.name} />
        <Item label="학과" value={row.major} />
        <Item label="학번" value={row.studentId} />
        <Item label="학년" value={String(row.grade)} />
        <Item label="성별" value={row.gender} />

        {row.codingExperience && <Item label="코딩 경험" value={row.codingExperience} />}
        {row.email && <Item label="이메일" value={row.email} />}
        {row.phone && <Item label="연락처" value={row.phone} />}
        {row.createdAt && <Item label="등록일" value={row.createdAt} />}
      </div>
    </BaseModal>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-bg-white/5 px-4 py-3">
      <span>{label}</span>
      <span className="font-bold text-text-default/90">{value}</span>
    </div>
  );
}
