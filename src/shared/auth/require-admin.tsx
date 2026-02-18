import type { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { getRoleFromAccessToken, isAccessTokenExpired } from './jwt';

interface RequireAdminProps {
  children: ReactNode;
}

export default function RequireAdmin({ children }: RequireAdminProps) {
  const token = sessionStorage.getItem('accessToken');

  // 토큰 없으면 로그인 페이지로
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 토큰 만료되었으면 로그인 페이지로
  if (isAccessTokenExpired(token)) {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    return <Navigate to="/login" replace />;
  }

  const role = getRoleFromAccessToken(token);

  // ADMIN이 아니면 홈으로 리다이렉트
  if (role !== 'ROLE_ADMIN') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
