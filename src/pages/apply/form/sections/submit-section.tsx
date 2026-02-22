import { isApplicationOpen } from '@/shared/lib/recruitment';
import { useAuth } from '@/shared/auth/use-auth';
type SubmitSectionProps = {
  readonly disabled?: boolean;
  readonly disabledReason?: 'CONSENT' | 'SUBMITTING' | 'LOADING';
  readonly onSubmit?: () => void;
};

export default function SubmitSection({
  disabled = false,
  disabledReason,
  onSubmit,
}: SubmitSectionProps) {
  const { role } = useAuth();
  const isAdmin = role === 'ADMIN';

  const isOpen = isApplicationOpen();
  const isDisabled = disabled || (!isOpen && !isAdmin);

  let disabledMessage = '';

  if (!isOpen) {
    disabledMessage = '현재는 지원 기간이 아니에요.';
  } else if (disabledReason === 'CONSENT') {
    disabledMessage = '개인정보 수집 및 이용에 동의해야 제출할 수 있어요.';
  } else if (disabledReason === 'SUBMITTING') {
    disabledMessage = '제출 중입니다. 잠시만 기다려주세요.';
  }

  return (
    <section className="mt-3 pb-10">
      <div className="mx-auto w-full max-w-[560px] px-4 md:max-w-[760px] md:px-0">
        <button
          type="button"
          disabled={isDisabled}
          aria-disabled={isDisabled}
          onClick={() => {
            if (isDisabled) return;
            onSubmit?.();
          }}
          className={[
            'w-full rounded-[20px] py-5 text-center text-xl font-extrabold transition-all',
            isDisabled
              ? 'cursor-not-allowed bg-gray-500/40 text-gray-300'
              : 'bg-point text-black shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:brightness-95',
          ].join(' ')}
        >
          제출하기
        </button>

        {isDisabled && (
          <p className="mt-4 text-center text-sm font-semibold text-text-default/70">
            {disabledMessage}
          </p>
        )}
      </div>
    </section>
  );
}
