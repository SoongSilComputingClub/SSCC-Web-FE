

type InterviewDayCardProps = {
  dayId: string;
  label: string;
  slots: string[];
  selectedKeys: string[];
  onToggle: (key: string) => void;
};

export default function InterviewDayCard({ dayId, label, slots, selectedKeys, onToggle }: InterviewDayCardProps) {
  return (
    <div className="w-full rounded-[20px] border border-border-emphasis bg-bg-muted px-5 py-5">
      <p className="text-base font-bold text-text-default/60">{label}</p>

      <div className="mt-5 space-y-4">
        {slots.map((time, idx) => {
          const key = `${dayId}-${idx}`;
          const checked = selectedKeys.includes(key);
          return (
            <label key={key} className="flex items-center gap-4">
              <input type="checkbox" checked={checked} onChange={() => onToggle(key)} className="h-5 w-5 accent-point" />
              <span className="text-base font-semibold text-text-default">{time}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}