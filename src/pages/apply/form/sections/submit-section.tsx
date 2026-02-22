import { useAuth } from '@/shared/auth/use-auth';
import { isApplicationOpen } from '@/shared/lib/recruitment';
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

  const computedDisabledReason: SubmitSectionProps['disabledReason'] | 'CLOSED' | undefined =
    isAdmin ? undefined : !isOpen ? 'CLOSED' : disabled ? (disabledReason ?? 'LOADING') : undefined;

  const isDisabled = Boolean(computedDisabledReason);

  const disabledMessage = (() => {
    switch (computedDisabledReason) {
      case 'CLOSED':
        return '현재는 지원 기간이 아니에요.';
      case 'CONSENT':
        return '개인정보 수집 및 이용에 동의해야 제출할 수 있어요.';
      case 'SUBMITTING':
        return '제출 중입니다. 잠시만 기다려주세요.';
      case 'LOADING':
        return '로딩 중입니다. 잠시만 기다려주세요.';
      default:
        return '';
    }
  })();

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
