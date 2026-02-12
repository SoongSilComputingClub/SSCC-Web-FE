import type { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { useAuth } from './use-auth';

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <>{children}</>;
  }

  // 로그인 후 다시 돌아올 경로 저장
  sessionStorage.setItem('postLoginRedirect', '/apply/form');
  sessionStorage.setItem('autoLogin', '1');

  return <Navigate to="/login" replace />;
}
