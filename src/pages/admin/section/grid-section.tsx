export function GridSection() {
  return (
    <section className="flex w-full items-center justify-center">
      <div className="w-[90%] whitespace-nowrap rounded-2xl p-2 text-center text-sm font-bold text-text-default/70">
        <div className="grid grid-cols-2 gap-0">
          <div className="grid gap-4">
            <div className="flex h-16 w-full items-center justify-center rounded-3xl bg-bg-muted px-6">
              CSV로 추출하기
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex h-20 items-center justify-center rounded-3xl bg-bg-muted px-4">
                성별 분포
              </div>
              <div className="flex h-20 items-center justify-center rounded-3xl bg-bg-muted px-4">
                코딩 경험
              </div>
            </div>
          </div>

          <div className="grid content-start gap-3">
            <div className="mx-auto flex h-12 w-[85%] items-center justify-center rounded-full bg-bg-muted px-6">
              학과 내림차순
            </div>
            <div className="mx-auto flex h-12 w-[85%] items-center justify-center rounded-full bg-bg-muted px-6">
              학년 내림차순
            </div>
            <div className="mx-auto flex h-12 w-[85%] items-center justify-center rounded-full bg-bg-muted px-6">
              학번 내림차순
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
