import type { ReactNode } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { ROLES } from '@/shared/auth/jwt';
import { isApplicationOpen } from '@/shared/lib/recruitment';

import { useAuth } from './use-auth';

export function RequireAuth({ children }: { readonly children: ReactNode }) {
  const { isLoggedIn, role } = useAuth();
  const isAdmin = role === ROLES.ADMIN;
  const location = useLocation();

  const isApplyFormRoute = location.pathname.startsWith('/apply/form');

  // 관리자 아닌 경우, 지원 기간이 아니면 접근 차단
  if (isApplyFormRoute && !isAdmin && !isApplicationOpen()) {
    return <Navigate to="/apply" replace />;
  }

  if (isLoggedIn) {
    return <>{children}</>;
  }

  // 로그인 후 다시 돌아올 경로 저장
  sessionStorage.setItem('postLoginRedirect', location.pathname + location.search);
  sessionStorage.setItem('autoLogin', '1');

  return <Navigate to="/login" replace />;
}
