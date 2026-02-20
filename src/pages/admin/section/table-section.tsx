import type { Row } from '@/pages/admin/index';

type TableSectionProps = {
  rows: Row[];
  onRowClick: (row: Row) => void;
};

export function TableSection({ rows, onRowClick }: Readonly<TableSectionProps>) {
  return (
    <section className="flex w-full items-center justify-center bg-bg-default py-10">
      <div className="w-[92%]">
        <div className="rounded-3xl border border-white/10 bg-bg-white/5 p-3 backdrop-blur">
          <table className="w-full table-fixed text-center">
            <thead className="bg-bg-muted/80">
              <tr className="text-sm font-bold text-text-default/90">
                <th className="px-2 py-4">순서</th>
                <th className="px-2 py-4">이름</th>
                <th className="px-2 py-4">학과</th>
                <th className="px-2 py-4">학번</th>
                <th className="px-2 py-4">학년</th>
                <th className="px-2 py-4">성별</th>
              </tr>
            </thead>

            <tbody className="text-xs text-text-default/60">
              {rows.map((row) => (
                <tr
                  key={row.studentId}
                  onClick={() => onRowClick(row)}
                  className="cursor-pointer border-b border-white/10 hover:bg-bg-white/5"
                >
                  <td className="px-2 py-5">{row.order}</td>
                  <td className="px-2 py-5">{row.name}</td>
                  <td className="px-2 py-5">{row.major}</td>
                  <td className="px-2 py-5">{row.studentId}</td>
                  <td className="px-2 py-5">{row.grade}</td>
                  <td className="px-2 py-5">{row.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
