type FormCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function FormCard({ children, className }: FormCardProps) {
  return (
    <div
      className={`
        w-full
        rounded-[20px]
        border border-border-default
        bg-bg-muted
        shadow-[8px_8px_4px_0_rgba(0,0,0,0.25)]
        ${className ?? ''}
      `}
    >
      {children}
    </div>
  );
}
