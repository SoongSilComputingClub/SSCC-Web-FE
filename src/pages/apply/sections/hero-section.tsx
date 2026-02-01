import { Link } from 'react-router-dom';
import { APPLICATION_GUARD_COPY } from '@/shared/config/recruitment';
import { getApplicationPhase, isApplicationOpen } from '@/shared/lib/recruitment';

import { isAuthed } from '@/shared/lib/auth';

const CTA_BUTTON_CLASS =
  'mt-4 inline-flex items-center justify-center rounded-xl bg-point px-8 py-4 text-xl font-semibold text-black shadow-md transition hover:opacity-90';

const HIGHLIGHT_TOKEN = 'SSCC';

const useAuth = () => ({
  // 임시: 실제 로그인 구현 전까지 `?authed=1`이면 로그인 상태로 간주
  isAuthed: isAuthed(),
});

/**
 * 카피 문자열 안의 "SSCC"만 포인트 컬러로 강조해서 렌더링
 */
function renderCopyWithHighlight(text: string) {
  const lines = text.split('\n');

  return lines.map((line, lineIdx) => {
    const parts = line.split(HIGHLIGHT_TOKEN);

    return (
      <span key={`line-${lineIdx}`}>
        {parts.map((chunk, idx) => (
          <span key={`chunk-${lineIdx}-${idx}`}>
            {chunk}
            {idx < parts.length - 1 && (
              <span className="text-point">{HIGHLIGHT_TOKEN}</span>
            )}
          </span>
        ))}
        {lineIdx < lines.length - 1 && <br />}
      </span>
    );
  });
}

type CtaButtonProps = {
  to: string;
  label: string;
};

function CtaButton({ to, label }: CtaButtonProps) {
  return (
    <Link to={to} className={CTA_BUTTON_CLASS}>
      {label}
    </Link>
  );
}

export default function HeroSection() {
  const { isAuthed } = useAuth();
  const phase = getApplicationPhase();
  const copy = APPLICATION_GUARD_COPY[phase];
  const isOpen = isApplicationOpen();

  return (
    <section className="flex min-h-[520px] w-full items-center justify-center bg-bg-default px-6 text-text-default">
      {phase === 'closed' ? (
        <h1 className="text-center text-2xl font-bold text-point leading-snug whitespace-pre-line">
          {copy.title}
        </h1>
      ) : (
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold leading-snug">
            {renderCopyWithHighlight(copy.title)}
          </h1>

          {copy.body && (
            <p className="text-xl font-bold">
              {renderCopyWithHighlight(copy.body)}
            </p>
          )}

          {copy.cta &&
            (isAuthed ? (
              isOpen ? (
                <CtaButton to="/apply/form" label={copy.cta.auth.label} />
              ) : (
                <span
                  className={`${CTA_BUTTON_CLASS} cursor-not-allowed opacity-50`}
                  aria-disabled
                >
                  {copy.cta.auth.label}
                </span>
              )
            ) : (
              isOpen ? (
                <CtaButton to="/login" label={copy.cta.unauth.label} />
              ) : (
                <span
                  className={`${CTA_BUTTON_CLASS} cursor-not-allowed opacity-50`}
                  aria-disabled
                >
                  {copy.cta.unauth.label}
                </span>
              )
            ))}
        </div>
      )}
    </section>
  );
}
