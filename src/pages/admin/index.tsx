import { useEffect, useMemo, useState } from 'react';

import { readApplyForms } from '@/shared/api/admin-api';
import { usePagination } from '@/shared/lib/use-pagination';
import { Pagination } from '@/shared/ui/pagination';

import { CodingStatsModal, GenderStatsModal, MemberDetailModal } from './modal/index';
import { GridSection } from './section/grid-section';
import { TableSection } from './section/table-section';

export type ApplyFormItem = {
  applyFormId: number;
  username: string;

  applicantName: string;
  department: string;
  studentNo: string;
  grade: number;
  gender: string;

  phone: string;
  introduce?: string;
  codingExp?: string;
  techStackText?: string;
  wantedValue?: string;
  aspiration?: string;
  interviewTimes?: Array<{ date: string; startTime: string; endTime: string }>;
};

export type Row = {
  order: number;

  name: string;
  major: string;
  studentId: string;
  grade: number;
  gender: string;

  phone: string;
  introduce?: string;
  codingExp?: string;
  techStackText?: string;

  applyFormId?: number;
  username?: string;
  wantedValue?: string;
  aspiration?: string;
  interviewTimes?: Array<{ date: string; startTime: string; endTime: string }>;
};

type SortKey = 'major' | 'grade' | 'studentId';
type ActiveModal = 'none' | 'gender' | 'coding' | 'detail';

export default function IndexPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [activeModal, setActiveModal] = useState<ActiveModal>('none');
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);

  useEffect(() => {
    const fetchRows = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const result = await readApplyForms();

        //result.data가 배열
        const items: ApplyFormItem[] = Array.isArray(result?.data)
          ? (result.data as ApplyFormItem[])
          : [];

        const mapped: Row[] = items.map((it, idx) => ({
          order: idx + 1,

          name: it.applicantName,
          major: it.department,
          studentId: it.studentNo,
          grade: it.grade,
          gender: it.gender,

          phone: it.phone,
          introduce: it.introduce,
          codingExp: it.codingExp,
          techStackText: it.techStackText,

          wantedValue: it.wantedValue,
          aspiration: it.aspiration,

          applyFormId: it.applyFormId,
          username: it.username,
          interviewTimes: it.interviewTimes ?? [],
        }));

        setRows(mapped);
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : '알 수 없는 오류';
        setErrorMessage(msg);
        setRows([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRows();
  }, []);

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
    const header = [
      '순서',
      '이름',
      '학과',
      '학번',
      '학년',
      '성별',
      '전화번호',
      '자기소개',
      '코딩경험',
      '기술스택',
      '원하는 가치',
      '포부',
      '면접 가능 시간',
    ];

    const formatInterviewTimes = (
      times?: { date: string; startTime: string; endTime: string }[],
    ) => {
      if (!times || times.length === 0) return '';
      // ✅ 날짜 줄 + 시간 줄 (슬롯마다 2줄)
      return times.map((t) => `${t.date}\n${t.startTime} ~ ${t.endTime}`).join('\n\n'); // 슬롯 간 한 줄 띄우기(원하면 '\n'로 바꿔도 됨)
    };

    const lines = rows.map((r) =>
      [
        r.order,
        r.name,
        r.major,
        r.studentId,
        r.grade,
        r.gender,
        r.phone,
        r.introduce,
        r.codingExp,
        r.techStackText,
        r.wantedValue,
        r.aspiration,
        formatInterviewTimes(r.interviewTimes),
      ]
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

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center text-sm text-text-default/70">
        로딩 중...
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center text-sm text-text-default/70">
        조회 실패: {errorMessage}
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center text-sm text-text-default/70">
        지원서 데이터가 없습니다.
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
      <GenderStatsModal isOpen={activeModal === 'gender'} onClose={closeModal} />
      <CodingStatsModal isOpen={activeModal === 'coding'} onClose={closeModal} />

      {/* ✅ 상세 모달 */}
      <MemberDetailModal isOpen={activeModal === 'detail'} row={selectedRow} onClose={closeModal} />
    </main>
  );
}
