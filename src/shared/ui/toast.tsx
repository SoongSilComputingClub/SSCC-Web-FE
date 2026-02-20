import { toast } from 'sonner';

import type { ExternalToast } from 'sonner';

const CHECK_ICON = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M20 6L9 17L4 12"
      stroke="#00A7CB"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const successToast = (message: string, options?: ExternalToast) => {
  const baseClassName =
    'bg-[#DFEDED] text-[#00A7CB] rounded-2xl px-6 py-4 font-semibold text-sm flex items-center gap-3 shadow-sm';

  const className = [baseClassName, options?.className].filter(Boolean).join(' ');

  toast.custom(
    () => (
      <div className={className}>
        {CHECK_ICON}
        <span>{message}</span>
      </div>
    ),
    {
      duration: 3000,
      className: 'bg-transparent p-0 shadow-none border-0',
      ...options,
    },
  );
};
