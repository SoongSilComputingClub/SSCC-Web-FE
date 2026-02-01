import SectionHeader from '../components/section-header';
import { RECRUITMENT_SCHEDULE } from '@/shared/config/recruitment';

function formatRange(startIso?: string, endIso?: string) {
  if (!startIso || !endIso) return null;
  const start = new Date(startIso);
  const end = new Date(endIso);
  const s = `${start.getMonth() + 1}.${start.getDate()}`;
  const e = `${end.getMonth() + 1}.${end.getDate()}`;
  return (
    <span className="font-semibold">
      <span className="text-point">{s}</span>
      <span className="mx-1 text-white">-</span>
      <span className="text-point">{e}</span>
    </span>
  );
}

export default function ScheduleSection() {
  return (
    <section className="flex w-full justify-center bg-bg-default px-6 py-16">
      <div className="flex w-full max-w-5xl flex-col items-center gap-12 text-center">
        {/* Header */}
        <SectionHeader label="SCHEDULE" title="모집 일정" />

        {/* Card */}
        <div className="w-full max-w-[520px] rounded-3xl bg-bg-muted px-8 py-10">
          <div className="flex flex-col gap-6">
            {RECRUITMENT_SCHEDULE.map((item, idx) => (
              <div key={item.title} className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-3 text-lg font-semibold text-text-default">
                  <span>{idx + 1}.</span>
                  <span>{item.title}</span>
                </div>

                <div className="text-lg">
                  {item.range ? formatRange(item.range.startIso, item.range.endIso) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
