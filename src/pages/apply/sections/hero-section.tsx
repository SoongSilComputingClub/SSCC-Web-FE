import { Link } from 'react-router-dom';

import { useAuth } from '@/shared/auth/use-auth';
import { APPLICATION_GUARD_COPY } from '@/shared/config/recruitment';
import { getApplicationPhase } from '@/shared/lib/recruitment';

const CTA_BUTTON_CLASS =
  'mt-4 inline-flex items-center justify-center rounded-xl bg-point px-8 py-4 text-lg font-semibold text-black shadow-md transition hover:opacity-90';

const HIGHLIGHT_TOKEN = 'SSCC';

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
            {idx < parts.length - 1 && <span className="text-point">{HIGHLIGHT_TOKEN}</span>}
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
  onClick?: () => void;
};

function CtaButton({ to, label, onClick }: CtaButtonProps) {
  return (
    <Link to={to} className={CTA_BUTTON_CLASS} onClick={onClick}>
      {label}
    </Link>
  );
}

export default function HeroSection() {
  const { isLoggedIn, logout } = useAuth();
  const phase = getApplicationPhase();
  const copy = APPLICATION_GUARD_COPY[phase];
  const isOpen = phase === 'open';

  return (
    <section className="relative flex min-h-[520px] w-full items-center justify-center bg-bg-default px-6 text-text-default">
      {phase === 'closed' ? (
        <h1 className="whitespace-pre-line text-center text-2xl font-bold leading-snug text-point">
          {copy.title}
        </h1>
      ) : (
        <div className="flex flex-col items-center text-center">
          <h1 className="text-xl font-bold leading-snug">{renderCopyWithHighlight(copy.title)}</h1>

          {copy.body && <p className="text-lg font-bold">{renderCopyWithHighlight(copy.body)}</p>}

          {copy.cta &&
            (() => {
              const ctaDetails = isLoggedIn ? copy.cta.auth : copy.cta.unauth;
              const to = isLoggedIn ? '/apply/form' : '/login';

              return isOpen ? (
                <CtaButton
                  to={to}
                  label={ctaDetails.label}
                  onClick={() => {
                    if (!isLoggedIn) {
                      sessionStorage.setItem('postLoginRedirect', '/apply');
                    }
                  }}
                />
              ) : (
                <span
                  className={`${CTA_BUTTON_CLASS} cursor-not-allowed opacity-50`}
                  aria-disabled={true}
                >
                  {ctaDetails.label}
                </span>
              );
            })()}
          {isLoggedIn && (
            <button
              type="button"
              onClick={logout}
              className="mt-3 rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow"
            >
              로그아웃
            </button>
          )}
        </div>
      )}
    </section>
  );
}
