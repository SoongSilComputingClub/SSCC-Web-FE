

import type { ReactNode } from "react";

type FormSectionHeaderProps = {
  title: string;
  description?: ReactNode;
  className?: string;
};

export default function FormSectionHeader({ title, description, className }: FormSectionHeaderProps) {
  return (
    <div className={["", className].filter(Boolean).join(" ")}>
      <h3 className="text-point text-2xl font-bold">{title}</h3>
      {description ? (
        <p className="mt-2 text-sm font-semibold text-text-default/70">{description}</p>
      ) : null}
    </div>
  );
}