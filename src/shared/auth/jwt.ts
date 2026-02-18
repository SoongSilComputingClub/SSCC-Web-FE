/* sessionStorage key 상수 (매직 스트링 방지) */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

/* role 상수 (매직 스트링 방지) */
export const ROLES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
  PREUSER: 'ROLE_PREUSER',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

/* JWT Payload 타입 정의 */
export interface JwtPayload {
  sub?: string;
  role?: Role;
  type?: 'access' | 'refresh';
  exp?: number; // expiration time (seconds)
  iat?: number; // issued at (seconds)
}

/* Base64URL 디코딩 함수 */
function base64UrlDecode(str: string): string {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
  return decodeURIComponent(
    atob(padded)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  );
}

/* JWT에서 payload를 디코딩하여 객체로 반환 */
export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = base64UrlDecode(parts[1]);
    return JSON.parse(payload);
  } catch (error) {
    console.error('JWT decode failed:', error);
    return null;
  }
}

/* accessToken 통합 파싱 유틸 (role + 만료 여부 + payload 반환) */
export function parseAccessToken(token: string): {
  role: JwtPayload['role'] | null;
  isExpired: boolean;
  payload: JwtPayload | null;
} {
  const payload = decodeJwtPayload(token);

  if (!payload) {
    return { role: null, isExpired: true, payload: null };
  }

  const now = Math.floor(Date.now() / 1000);
  const isExpired = !payload.exp || payload.exp < now;

  return {
    role: payload.role ?? null,
    isExpired,
    payload,
  };
}

/* accessToken에서 role 값 추출 */
export function getRoleFromAccessToken(token: string): Role | null {
  const payload = decodeJwtPayload(token);
  return payload?.role ?? null;
}

/* accessToken 만료 여부 체크 */
export function isAccessTokenExpired(token: string): boolean {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return true;

  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}
