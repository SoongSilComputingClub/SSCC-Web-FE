import { STORAGE_KEYS } from '../auth/jwt';

// 동시에 여러 요청이 401을 맞아도 refresh는 1번만 실행되도록 잠금(락) 역할
let refreshPromise: Promise<string> | null = null;

function toHeaders(init: RequestInit['headers']): Headers {
  // RequestInit.headers는 Headers | [][ ] | Record<string, string>
  if (init instanceof Headers) return init;
  return new Headers(init ?? undefined);
}

function redirectToLoginAndClearTokens() {
  sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  sessionStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  globalThis.location.href = '/login';
}

// AccessToken 재발급
async function refreshAccessToken(): Promise<string> {
  const refreshToken = sessionStorage.getItem('refreshToken');

  if (!refreshToken) {
    throw new Error('RefreshToken 없음');
  }

  const response = await fetch(`/api/jwt/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('토큰 갱신 실패');
  }

  const data = await response.json();

  sessionStorage.setItem('accessToken', data.data.accessToken);
  sessionStorage.setItem('refreshToken', data.data.refreshToken);
  globalThis.dispatchEvent(new Event('auth-changed'));

  return data.data.accessToken;
}

async function getRefreshedAccessTokenOnce(): Promise<string> {
  // 이미 refresh 중이면 그 Promise를 그대로 재사용
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      return await refreshAccessToken();
    } finally {
      // 성공/실패 상관없이 다음 refresh를 위해 잠금 해제
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

function buildFinalUrl(url: string): string {
  const raw = String(url ?? '').trim();

  // 외부 도메인으로의 요청에 Authorization 헤더가 붙어 토큰이 유출되는 것을 방지
  // - protocol-relative: //attacker.com
  // - absolute URL: https://attacker.com, http://..., custom schemes
  if (raw.startsWith('//') || /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(raw)) {
    throw new Error('fetchWithAccess는 상대 경로만 허용합니다.');
  }

  const path = raw.startsWith('/') ? raw : `/${raw}`;

  // e.g. "/jwt/refresh" -> "/api/jwt/refresh"
  if (path.startsWith('/api/')) return path;
  if (path === '/api') return '/api';
  return `/api${path}`;
}

// 인증 포함 fetch
export async function fetchWithAccess(url: string, options: RequestInit = {}): Promise<Response> {
  const accessToken = sessionStorage.getItem('accessToken');

  // 토큰이 없으면 보호 API 호출 자체가 의미 없으므로 로그인으로
  if (!accessToken) {
    redirectToLoginAndClearTokens();
    throw new Error('AccessToken 없음');
  }

  const headers = toHeaders(options.headers);
  headers.set('Authorization', `Bearer ${accessToken}`);

  // fetch는 Headers 인스턴스도 headers로 받을 수 있음
  const mergedOptions: RequestInit = {
    ...options,
    headers,
  };

  // B 방식: 상대경로(/apply-forms/..)를 넘기면 BASE_URL을 붙여서 직접 호출
  const finalUrl = buildFinalUrl(url);

  let response = await fetch(finalUrl, mergedOptions);

  // 401이면 자동 갱신 후 1회 재시도
  if (response.status === 401) {
    try {
      const newAccessToken = await getRefreshedAccessTokenOnce();
      headers.set('Authorization', `Bearer ${newAccessToken}`);
      response = await fetch(finalUrl, { ...mergedOptions, headers });
    } catch (err) {
      // 갱신 실패 → 강제 로그아웃
      redirectToLoginAndClearTokens();
      throw err;
    }
  }

  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status}`);
  }

  return response;
}
