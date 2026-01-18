type SubmitSectionProps = {
  disabled?: boolean;
  onSubmit?: () => void;
};

export default function SubmitSection({ disabled = false, onSubmit }: SubmitSectionProps) {
  return (
    <section className="mt-12 pb-16">
      <div className="mx-auto w-full max-w-[560px] px-4 md:max-w-[760px] md:px-0">
        <button
          type="button"
          disabled={disabled}
          onClick={onSubmit}
          className={[
            "w-full rounded-[20px] py-5 text-center text-xl font-extrabold transition-all",
            disabled
              ? "cursor-not-allowed bg-gray-500/40 text-gray-300"
              : "bg-point text-black shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:brightness-95",
          ].join(" ")}
        >
          제출하기
        </button>

        {disabled && (
          <p className="mt-4 text-center text-sm font-semibold text-text-default/70">
            개인정보 수집 및 이용에 동의해야 제출할 수 있어요.
          </p>
        )}
      </div>
    </section>
  );
}