import { useCallback, useEffect, useState } from 'react';

function openExternalInKakao(url: string) {
  const externalUrl = `kakaotalk://web/openExternal?url=${encodeURIComponent(url)}`;
  window.location.href = externalUrl;
}

function buildGoogleOauthUrl(baseUrl?: string) {
  const base = String(baseUrl ?? '').replace(/\/+$/, '');
  return base ? `${base}/oauth2/authorization/google` : '';
}

export default function LoginPage() {
  const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string | undefined;

  // User Agent 플래그 확인
  const ua = navigator.userAgent || '';
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isKakaoInApp = /KAKAOTALK/i.test(ua);
  const isOtherInApp = /(Instagram|FBAN|FBAV|Line|NAVER\(inapp\))/i.test(ua);
  const isInApp = isKakaoInApp || isOtherInApp;

  // 인앱 브라우저의 경우 버튼 클릭 유도
  const [showFallback, setShowFallback] = useState<boolean>(() => isInApp);

  const oauthUrl = buildGoogleOauthUrl(BACKEND_API_BASE_URL);

  const startLogin = useCallback(() => {
    if (!oauthUrl) return;

    // 카카오톡의 경우 외부 브라우저로 여는 방식 사용
    if (isKakaoInApp) {
      openExternalInKakao(oauthUrl);
      return;
    }

    window.location.assign(oauthUrl);
  }, [oauthUrl, isKakaoInApp]);

  useEffect(() => {
    if (!oauthUrl) return;

    if (isInApp) return;

    startLogin();
    if (isIOS) {
      const t = window.setTimeout(() => setShowFallback(true), 800);
      return () => window.clearTimeout(t);
    }
  }, [oauthUrl, isInApp, isIOS, startLogin]);

  if (!oauthUrl) {
    return (
      <div className="flex min-h-screen items-center justify-center text-text-default">
        로그인 설정이 필요합니다.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-text-default">
      <button
        type="button"
        onClick={startLogin}
        className="w-full max-w-sm rounded-xl bg-point px-6 py-4 text-center text-base font-semibold text-text-black"
      >
        Google로 계속하기
      </button>

      <div className="text-center text-sm text-text-placeholder">
        {isKakaoInApp
          ? '위의 "Google로 계속하기" 버튼을 눌러 외부 브라우저에서 로그인을 진행해주세요.'
          : showFallback
            ? '로그인 화면이 자동으로 열리지 않으면 위 버튼을 눌러주세요.'
            : '로그인 화면으로 이동 중...'}
      </div>
    </div>
  );
}
