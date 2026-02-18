/* JWT Payload 타입 정의 */
export interface JwtPayload {
  sub?: string;
  role?: 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_PREUSER';
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

/* accessToken에서 role 값 추출 */
export function getRoleFromAccessToken(token: string): string | null {
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
