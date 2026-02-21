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
  const isOpen = isApplicationOpen();
  const isDisabled = disabled || !isOpen;
  return (
    <section className="mt-3 pb-10">
      <div className="mx-auto w-full max-w-[560px] px-4 md:max-w-[760px] md:px-0">
        <button
          type="button"
          aria-disabled={isDisabled}
          onClick={onSubmit}
          className={[
            'w-full rounded-[20px] py-5 text-center text-xl font-extrabold transition-all',
            isDisabled
              ? 'bg-gray-500/40 text-gray-300'
              : 'bg-point text-black shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:brightness-95',
          ].join(' ')}
        >
          제출하기
        </button>

        {isDisabled && (
          <p className="mt-4 text-center text-sm font-semibold text-text-default/70">
            {!isOpen
              ? '현재는 지원 기간이 아니에요.'
              : disabledReason === 'CONSENT'
                ? '개인정보 수집 및 이용에 동의해야 제출할 수 있어요.'
                : disabledReason === 'SUBMITTING'
                  ? '제출 중입니다. 잠시만 기다려주세요.'
                  : ''}
          </p>
        )}
      </div>
    </section>
  );
}
