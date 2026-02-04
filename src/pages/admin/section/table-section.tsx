type Row = {
  order: number;
  name: string;
  major: string;
  studentId: string;
  grade: number;
  gender: string;
};

const mockRows: Row[] = Array.from({ length: 15 }, () => ({
  order: 1,
  name: '김명주',
  major: '컴퓨터학과',
  studentId: '20231425',
  grade: 1,
  gender: '여',
}));

export default function TableSection() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-bg-default pb-10 pt-20">
      <div className="w-[92%]">
        <div className="rounded-3xl border border-white/10 bg-bg-white/5 p-3 backdrop-blur">
          {/* 스크롤 영역 */}
          <div className="overflow-hidden rounded-2xl">
            <div className="overflow-y-auto">
              <table className="w-full table-fixed text-center">
                {/* 헤더 고정 */}
                <thead className="sticky top-0 z-10 bg-[#151515]">
                  <tr className="text-sm font-bold text-white/90">
                    <th className="px-2 py-4">순서</th>
                    <th className="px-2 py-4">이름</th>
                    <th className="px-2 py-4">학과</th>
                    <th className="px-2 py-4">학번</th>
                    <th className="px-2 py-4">학년</th>
                    <th className="px-2 py-4">성별</th>
                  </tr>
                </thead>

                <tbody className="text-xs text-white/60">
                  {mockRows.map((row, idx) => (
                    <tr key={`${row.studentId}-${idx}`} className="border-b border-white/10">
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
        </div>
      </div>
    </section>
  );
}
