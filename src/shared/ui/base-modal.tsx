import { useEffect } from 'react';

type BaseModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function BaseModal({ isOpen, title, onClose, children }: BaseModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <button
        type="button"
        aria-label="close-modal-overlay"
        onClick={onClose}
        className="absolute inset-0 bg-bg-default/60"
      />

      {/* panel */}
      <div className="absolute left-1/2 top-1/2 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-3xl border border-white/10 bg-bg-muted p-4 text-text-default shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-text-default/90">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-3 py-2 text-sm text-text-default/60 hover:bg-bg-white/5 hover:text-text-default"
            >
              닫기
            </button>
          </div>

          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
