import { useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import { APPLICATION_GUARD_COPY } from '@/shared/config/recruitment';
import { getApplicationPhase } from '@/shared/lib/recruitment';

const CTA_BUTTON_CLASS =
  'mt-4 inline-flex items-center justify-center rounded-xl bg-point px-8 py-4 text-xl font-semibold text-black shadow-md transition hover:opacity-90';

const HIGHLIGHT_TOKEN = 'SSCC';

const AUTH_TOKEN_STORAGE_KEY = 'accessToken';

const authStore = {
  subscribe(callback: () => void) {
    if (typeof window === 'undefined') {
      return () => {};
    }

    const handler = () => callback();
    window.addEventListener('storage', handler);

    return () => {
      window.removeEventListener('storage', handler);
    };
  },
  getSnapshot() {
    if (typeof window === 'undefined') {
      return false;
    }

    return Boolean(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY));
  },
};

const useAuth = () => ({
  isAuthed: useSyncExternalStore(
    authStore.subscribe,
    authStore.getSnapshot,
    () => false,
  ),
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
              <CtaButton to="/apply/form" label={copy.cta.auth.label} />
            ) : (
              <CtaButton to="/login" label={copy.cta.unauth.label} />
            ))}
        </div>
      )}
    </section>
  );
}
