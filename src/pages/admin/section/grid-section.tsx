type GridSectionProps = {
  onExportCsv: () => void;
  onOpenGender: () => void;
  onOpenCoding: () => void;
  onSortMajor: () => void;
  onSortGrade: () => void;
  onSortStudentId: () => void;
};

export function GridSection({
  onExportCsv,
  onOpenGender,
  onOpenCoding,
  onSortMajor,
  onSortGrade,
  onSortStudentId,
}: GridSectionProps) {
  return (
    <section className="flex w-full items-center justify-center">
      <div className="w-[90%] whitespace-nowrap rounded-2xl p-2 text-center text-sm font-bold text-text-default/70">
        <div className="grid grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="grid gap-4">
            <button
              type="button"
              onClick={onExportCsv}
              className="flex h-16 w-full items-center justify-center rounded-3xl bg-bg-muted px-6"
            >
              CSV로 추출하기
            </button>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={onOpenGender}
                className="flex h-20 items-center justify-center rounded-3xl bg-bg-muted px-4"
              >
                성별 분포
              </button>

              <button
                type="button"
                onClick={onOpenCoding}
                className="flex h-20 items-center justify-center rounded-3xl bg-bg-muted px-4"
              >
                코딩 경험
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid content-start gap-3">
            <button
              type="button"
              onClick={onSortMajor}
              className="mx-auto flex h-12 w-[85%] items-center justify-center rounded-full bg-bg-muted px-6"
            >
              학과 내림차순
            </button>

            <button
              type="button"
              onClick={onSortGrade}
              className="mx-auto flex h-12 w-[85%] items-center justify-center rounded-full bg-bg-muted px-6"
            >
              학년 내림차순
            </button>

            <button
              type="button"
              onClick={onSortStudentId}
              className="mx-auto flex h-12 w-[85%] items-center justify-center rounded-full bg-bg-muted px-6"
            >
              학번 내림차순
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
