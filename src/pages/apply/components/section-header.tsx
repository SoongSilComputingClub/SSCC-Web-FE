type SectionHeaderProps = {
  label: string;
  title: string;
};

export default function SectionHeader({ label, title }: SectionHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm font-semibold text-point tracking-wider">{label}</p>
      <h2 className="text-xl font-bold leading-snug text-text-default">{title}</h2>
    </div>
  );
}
