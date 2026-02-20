import { Link } from 'react-router-dom';

import { ROLES } from '@/shared/auth/jwt';
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

type CtaDetails = {
  label: string;
  action: string;
  title?: string;
  body?: string;
};

function getCtaDetails(
  copy: (typeof APPLICATION_GUARD_COPY)[keyof typeof APPLICATION_GUARD_COPY],
  isLoggedIn: boolean,
  hasApplication: boolean | null,
): CtaDetails | null {
  if (!copy.cta) return null;

  if (isLoggedIn && hasApplication === null) return null;

  if (!isLoggedIn) return copy.cta.unauth as CtaDetails;

  return hasApplication
    ? (copy.cta.auth.existing as CtaDetails)
    : (copy.cta.auth.new as CtaDetails);
}

export default function HeroSection({ hasApplication }: { hasApplication: boolean | null }) {
  const { isLoggedIn, logout, role } = useAuth();

  // admin이면 날짜와 관계 없이 항상 open 처리 (JWT role 기반)
  const isAdmin = role === ROLES.ADMIN;

  const phase = getApplicationPhase(new Date(), isAdmin);
  const copy = APPLICATION_GUARD_COPY[phase];
  const isOpen = phase === 'open';

  // CTA에 title/body 오버라이드가 있으면 우선 적용
  const ctaDetails = getCtaDetails(copy, isLoggedIn, hasApplication);

  const titleText: string = ctaDetails?.title ?? copy.title;
  const bodyText: string | undefined = ctaDetails?.body ?? copy.body;

  return (
    <section className="relative flex min-h-[520px] w-full items-center justify-center bg-bg-default px-6 text-text-default">
      {phase === 'closed' ? (
        <h1 className="whitespace-pre-line text-center text-2xl font-bold leading-snug text-point">
          {copy.title}
        </h1>
      ) : (
        <div className="flex flex-col items-center text-center">
          <h1 className="text-xl font-bold leading-snug">{renderCopyWithHighlight(titleText)}</h1>

          {bodyText && <p className="text-lg font-bold">{renderCopyWithHighlight(bodyText)}</p>}

          {copy.cta &&
            (() => {
              const to = !isLoggedIn
                ? '/login'
                : hasApplication === true
                  ? '/apply/form?mode=edit'
                  : '/apply/form?mode=new';
              // 로딩 중(hasApplication === null)에는 CTA를 숨기지 말고 비활성 상태로 보여준다
              if (!ctaDetails) {
                return (
                  <span
                    className={`${CTA_BUTTON_CLASS} cursor-not-allowed opacity-50`}
                    aria-disabled={true}
                  >
                    불러오는 중...
                  </span>
                );
              }

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
              className="mt-5 rounded-xl border-2 border-point px-8 py-2 text-sm font-semibold text-point shadow"
            >
              로그아웃
            </button>
          )}
        </div>
      )}
    </section>
  );
}
