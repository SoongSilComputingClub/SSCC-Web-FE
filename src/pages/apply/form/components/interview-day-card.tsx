type InterviewDayCardProps = {
  dayId: string;
  label: string;
  slots: string[];
  selectedKeys: string[];
  onToggle: (key: string) => void;
};

export default function InterviewDayCard({
  dayId,
  label,
  slots,
  selectedKeys,
  onToggle,
}: InterviewDayCardProps) {
  return (
    <div className="w-full rounded-[20px] border border-border-emphasis bg-bg-muted p-5">
      <p className="text-base font-bold text-text-default/60">{label}</p>

      <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4">
        {slots.map((time) => {
          // time 예: "10:00 - 11:00" → key: "2026-02-08|10:00|11:00"
          const [startTimeRaw, endTimeRaw] = time.split(' - ');
          const startTime = (startTimeRaw ?? '').trim();
          const endTime = (endTimeRaw ?? '').trim();
          const key = `${dayId}|${startTime}|${endTime}`;

          const checked = selectedKeys.includes(key);
          return (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(key)}
                className="size-4 accent-point"
              />
              <span className="text-sm font-semibold text-text-default">{time}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
