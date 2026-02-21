import type { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { parseAccessToken, ROLES, STORAGE_KEYS } from './jwt';

interface RequireAdminProps {
  readonly children: ReactNode;
}

export default function RequireAdmin({ children }: RequireAdminProps) {
  const token = sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

  // 토큰 없으면 로그인 페이지로
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const { role, isExpired } = parseAccessToken(token);

  // 토큰 만료되었으면 로그인 페이지로
  if (isExpired) {
    sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    return <Navigate to="/login" replace />;
  }

  // ADMIN이 아니면 홈으로 리다이렉트
  if (role !== ROLES.ADMIN) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
