import { useEffect, useRef } from 'react';

type BaseModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function BaseModal({ isOpen, title, onClose, children }: Readonly<BaseModalProps>) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // ✅ React state(isOpen) <-> dialog.showModal()/close() 동기화
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      // 이미 open이면 중복 showModal 방지
      if (!dialog.open) dialog.showModal();
    } else {
      // 이미 닫혀있으면 close 생략
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  // ✅ dialog 기본 동작:
  // - ESC 누르면 'cancel' 이벤트 발생 → 닫기 처리
  // - backdrop 클릭은 기본으로 닫히지 않으므로(브라우저별 상이) 폼 버튼으로 처리
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      // 기본 cancel 동작(자동 close) 막고, React state로 닫기 일원화
      e.preventDefault();
      onClose();
    };

    const handleClose = () => {
      // dialog.close() 등으로 닫혔을 때도 state 일원화
      // (이미 state가 닫힘이면 중복 호출해도 무해)
      onClose();
    };

    dialog.addEventListener('cancel', handleCancel);
    dialog.addEventListener('close', handleClose);

    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      dialog.removeEventListener('close', handleClose);
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={title}
      className="rounded-3xl border border-white/10 bg-[#0f0f0f] p-0 text-white shadow-xl backdrop:bg-black/60"
    >
      <div className="w-[92vw] max-w-md p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white/90">{title}</h2>

          {/* ✅ dialog 내부에서 close를 일으키는 가장 표준 방식: method="dialog" */}
          <form method="dialog">
            <button
              type="submit"
              className="rounded-xl px-3 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white"
            >
              닫기
            </button>
          </form>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </dialog>
  );
}
