import SectionHeader from '../components/section-header';

const SCHEDULE_ITEMS = [
  { title: '서류 접수', period: '2.21-2.22' },
  { title: '면접', period: '2.23-2.24' },
  { title: '결과 발표', period: '2.24-2.25' },
] as const;

export default function ScheduleSection() {
  return (
    <section className="w-full bg-bg-default px-6 py-16 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col items-center text-center gap-12">
        {/* Header */}
        <SectionHeader label="SCHEDULE" title="모집 일정" />

        {/* Card */}
        <div className="w-full max-w-[520px] rounded-3xl bg-bg-muted px-8 py-10">
          <div className="flex flex-col gap-6">
            {SCHEDULE_ITEMS.map((item, idx) => (
              <div key={item.title} className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-3 text-lg text-text-default">
                  <span> {idx + 1}. </span>
                  <span> {item.title} </span>
                </div>

                <span className="text-lg text-point">{item.period}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
