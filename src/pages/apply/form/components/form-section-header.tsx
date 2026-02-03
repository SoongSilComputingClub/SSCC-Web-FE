import type { ReactNode } from 'react';

type FormSectionHeaderProps = {
  title: string;
  description?: ReactNode;
  className?: string;
};

export default function FormSectionHeader({
  title,
  description,
  className,
}: FormSectionHeaderProps) {
  return (
    <div className={['', className].filter(Boolean).join(' ')}>
      <h3 className="text-xl font-bold text-point">{title}</h3>
      {description ? (
        <p className="mt-2 text-sm font-semibold text-text-default/70">{description}</p>
      ) : null}
    </div>
  );
}
