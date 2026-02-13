import { useMemo, useState } from 'react';

import { usePagination } from '@/shared/lib/use-pagination';
import { Pagination } from '@/shared/ui/pagination';

import { CodingStatsModal, GenderStatsModal, MemberDetailModal } from './modal/index';
import { GridSection } from './section/grid-section';
import { TableSection } from './section/table-section';

export type Row = {
  order: number;
  name: string;
  major: string;
  studentId: string;
  grade: number;
  gender: string;

  // 표에는 안 보이지만 서버에서 받는 데이터(예시)
  codingExp?: string;
  email?: string;
  phone?: string;
  createdAt?: string;
};

type SortKey = 'major' | 'grade' | 'studentId';

type ActiveModal = 'none' | 'gender' | 'coding' | 'detail';

export default function IndexPage() {
  // TODO: 실제로는 fetch로 채우기
  const CODING_EXPS = ['A', 'B', 'C', 'D', 'E'] as const;

  const [rows] = useState<Row[]>(() =>
    Array.from({ length: 28 }, (_, i) => ({
      order: i + 1,
      name: '김명주',
      major: i % 2 === 0 ? '컴퓨터학과' : '소프트웨어학부',
      studentId: String(20231425 + i),
      grade: (i % 4) + 1,
      gender: i % 2 === 0 ? '여' : '남',
      codingExp: CODING_EXPS[i % CODING_EXPS.length],
      email: `user${i}@example.com`,
      phone: `010-0000-${String(1000 + i)}`,
      createdAt: '2026-02-04',
    })),
  );

  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [activeModal, setActiveModal] = useState<ActiveModal>('none');
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);

  // ✅ 정렬된(혹은 원본) 전체 리스트
  const sortedRows = useMemo(() => {
    if (!sortKey) return rows;

    const sorted = [...rows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];

      const aVal = typeof av === 'number' ? av : String(av);
      const bVal = typeof bv === 'number' ? bv : String(bv);

      // 기본: 내림차순
      if (aVal < bVal) return 1;
      if (aVal > bVal) return -1;
      return 0;
    });

    return sorted.map((r, idx) => ({ ...r, order: idx + 1 }));
  }, [rows, sortKey]);

  // ✅ 페이지네이션은 “표에 보여줄 데이터”에만 적용
  const { page, totalPages, pageItems, setPage } = usePagination({
    items: sortedRows,
    pageSize: 10,
  });

  // ✅ CSV 내보내기: (전체 데이터 기준)
  const exportCsv = () => {
    const header = ['순서', '이름', '학과', '학번', '학년', '성별'];

    const lines = rows.map((r) =>
      [r.order, r.name, r.major, r.studentId, r.grade, r.gender]
        .map((v) => {
          const s = String(v);
          const sanitized = /^[=+\-@]/.test(s) ? "'" + s : s;
          return '"' + sanitized.replaceAll('"', '""') + '"';
        })
        .join(','),
    );

    // ✅ BOM 추가 + CRLF(\r\n)로 줄바꿈 (엑셀 호환성 ↑)
    const csvBody = [header.join(','), ...lines].join('\r\n');
    const csvWithBom = `\uFEFF${csvBody}`;

    const blob = new Blob([csvWithBom], { type: 'text/csv;charset=utf-8' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '2026_1학기_SSCC_지원서.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const openGenderModal = () => setActiveModal('gender');
  const openCodingModal = () => setActiveModal('coding');

  const openDetailModal = (row: Row) => {
    setSelectedRow(row);
    setActiveModal('detail');
  };

  const closeModal = () => {
    setActiveModal('none');
    setSelectedRow(null);
  };

  if (rows.length === 0) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center text-sm text-text-default/70">
        데이터가 없습니다.
      </div>
    );
  }

  return (
    <main className="w-full">
      <div className="flex w-full justify-center bg-bg-default pt-20">
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>

      <TableSection rows={pageItems} onRowClick={openDetailModal} />

      <GridSection
        onExportCsv={exportCsv}
        onOpenGender={openGenderModal}
        onOpenCoding={openCodingModal}
        onSortMajor={() => {
          setSortKey('major');
          setPage(1);
        }}
        onSortGrade={() => {
          setSortKey('grade');
          setPage(1);
        }}
        onSortStudentId={() => {
          setSortKey('studentId');
          setPage(1);
        }}
      />

      {/* ✅ 분포 모달: 전체 rows 기준으로 집계(원하면 sortedRows로 바꿔도 됨) */}
      <GenderStatsModal isOpen={activeModal === 'gender'} rows={rows} onClose={closeModal} />
      <CodingStatsModal isOpen={activeModal === 'coding'} rows={rows} onClose={closeModal} />

      {/* ✅ 상세 모달 */}
      <MemberDetailModal isOpen={activeModal === 'detail'} row={selectedRow} onClose={closeModal} />
    </main>
  );
}
