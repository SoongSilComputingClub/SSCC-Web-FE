import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import {
  decodeJwtPayload,
  getRoleFromAccessToken,
  isAccessTokenExpired,
  STORAGE_KEYS,
} from './jwt';
import RequireAdmin from './require-admin';

/**
 * 테스트용 JWT 생성 (Base64URL 인코딩)
 * - signature는 검증하지 않으니 아무 문자열이어도 됨
 */
function base64UrlEncode(obj: unknown) {
  const json = JSON.stringify(obj);
  const b64 = btoa(unescape(encodeURIComponent(json))); // jsdom 환경 가정

  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function createMockJwt(payload: Record<string, unknown>) {
  const header = { alg: 'HS256', typ: 'JWT' };
  return `${base64UrlEncode(header)}.${base64UrlEncode(payload)}.signature`;
}

describe('auth: jwt.ts + RequireAdmin', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  // =========================
  // jwt.ts 테스트
  // =========================
  it('decodeJwtPayload: 정상 토큰은 payload 객체를 반환한다', () => {
    const token = createMockJwt({
      sub: 'GOOGLE_123',
      role: 'ROLE_PREUSER',
      type: 'access',
      exp: 9999999999,
      iat: 1,
    });

    const decoded = decodeJwtPayload(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.sub).toBe('GOOGLE_123');
    expect(decoded?.role).toBe('ROLE_PREUSER');
    expect(decoded?.type).toBe('access');
  });

  it('decodeJwtPayload: 형식이 잘못된 토큰은 null을 반환한다', () => {
    expect(decodeJwtPayload('not-a-jwt')).toBeNull();
    expect(decodeJwtPayload('a.b')).toBeNull();
  });

  it('getRoleFromAccessToken: role 값을 추출한다', () => {
    const token = createMockJwt({ role: 'ROLE_ADMIN', exp: 9999999999 });
    expect(getRoleFromAccessToken(token)).toBe('ROLE_ADMIN');
  });

  it('isAccessTokenExpired: exp가 과거면 만료(true), 미래면 미만료(false)', () => {
    const nowSec = Math.floor(Date.now() / 1000);

    const expired = createMockJwt({ exp: nowSec - 10, role: 'ROLE_USER' });
    const valid = createMockJwt({ exp: nowSec + 10, role: 'ROLE_USER' });

    expect(isAccessTokenExpired(expired)).toBe(true);
    expect(isAccessTokenExpired(valid)).toBe(false);
  });

  it('isAccessTokenExpired: exp가 없으면 만료(true)로 본다', () => {
    const token = createMockJwt({ role: 'ROLE_USER' });
    expect(isAccessTokenExpired(token)).toBe(true);
  });

  // =========================
  // require-admin.tsx 테스트
  // =========================
  function renderAdminRoute() {
    return render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/" element={<div>HOME</div>} />
          <Route path="/login" element={<div>LOGIN</div>} />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <div>ADMIN</div>
              </RequireAdmin>
            }
          />
        </Routes>
      </MemoryRouter>,
    );
  }

  it('토큰이 없으면 /login으로 리다이렉트한다', () => {
    renderAdminRoute();
    expect(screen.getByText('LOGIN')).toBeTruthy();
  });

  it('ROLE_ADMIN이면 /admin 접근이 허용된다', () => {
    const nowSec = Math.floor(Date.now() / 1000);
    const token = createMockJwt({ role: 'ROLE_ADMIN', exp: nowSec + 60 });

    sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);

    renderAdminRoute();
    expect(screen.getByText('ADMIN')).toBeTruthy();
  });

  it('ROLE_ADMIN이 아니면 / 로 리다이렉트한다', () => {
    const nowSec = Math.floor(Date.now() / 1000);
    const token = createMockJwt({ role: 'ROLE_PREUSER', exp: nowSec + 60 });

    sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);

    renderAdminRoute();
    expect(screen.getByText('HOME')).toBeTruthy();
  });

  it('토큰이 만료되면 access/refresh를 삭제하고 /login으로 리다이렉트한다', () => {
    const nowSec = Math.floor(Date.now() / 1000);
    const token = createMockJwt({ role: 'ROLE_ADMIN', exp: nowSec - 1 });

    sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
    sessionStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, 'dummy-refresh');

    const removeSpy = vi.spyOn(sessionStorage.__proto__, 'removeItem');

    renderAdminRoute();

    expect(screen.getAllByText('LOGIN').length).toBeGreaterThan(0);
    expect(removeSpy).toHaveBeenCalledWith(STORAGE_KEYS.ACCESS_TOKEN);
    expect(removeSpy).toHaveBeenCalledWith(STORAGE_KEYS.REFRESH_TOKEN);
  });
});
