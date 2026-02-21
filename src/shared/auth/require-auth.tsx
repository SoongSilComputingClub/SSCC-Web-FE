import type { ReactNode } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from './use-auth';

export function RequireAuth({ children }: { readonly children: ReactNode }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (isLoggedIn) {
    return <>{children}</>;
  }

  // 로그인 후 다시 돌아올 경로 저장
  sessionStorage.setItem('postLoginRedirect', location.pathname + location.search);
  sessionStorage.setItem('autoLogin', '1');

  return <Navigate to="/login" replace />;
}
