import { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { parseAccessToken, ROLES, STORAGE_KEYS } from '@/shared/auth/jwt';

import { useAuth } from '@/shared/auth/use-auth';

export default function CookiePage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const didRunRef = useRef(false);

  useEffect(() => {
    if (didRunRef.current) return;
    didRunRef.current = true;

    const performRedirect = (accessToken?: string) => {
      // 기본: 로그인 전 사용자가 가려던 경로가 있으면 그쪽으로, 없으면 /apply
      const redirectTo = sessionStorage.getItem('postLoginRedirect') ?? '/apply';
      sessionStorage.removeItem('postLoginRedirect');

      // 로그인 직후 ADMIN이면 /admin으로 우선 이동
      if (accessToken) {
        const { role, isExpired } = parseAccessToken(accessToken);
        if (!isExpired && role === ROLES.ADMIN) {
          navigate('/admin', { replace: true });
          return;
        }
      }

      navigate(redirectTo, { replace: true });
    };

    // 이미 토큰이 저장된 상태면(이중 호출/새로고침 등) 바로 리다이렉트
    const existingAccess = sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (existingAccess) {
      performRedirect(existingAccess ?? undefined);
      return;
    }

    const exchangeToken = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/jwt/exchange`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: '{}',
          credentials: 'include',
        });

        if (!response.ok) {
          const errText = await response.text().catch(() => '');
          console.error('/jwt/exchange failed', {
            status: response.status,
            statusText: response.statusText,
            body: errText,
          });
          throw new Error(`교환 실패 (${response.status})`);
        }

        const data = await response.json();

        login(data.data.accessToken, data.data.refreshToken);

        // 로그인 완료 시 role 기반으로 이동 분기(ADMIN이면 /admin 우선)
        performRedirect(data.data.accessToken);
      } catch (err) {
        console.error('토큰 교환 실패:', err);

        // 이미 토큰이 있으면(첫 요청 성공 후 추가 요청 실패 등) 실패 알림 없이 진행
        const existing = sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        if (existing) {
          performRedirect(existing);
          return;
        }

        alert('로그인에 실패했습니다.');
        navigate('/login');
      }
    };

    exchangeToken();
  }, [login, navigate]);

  return <div>로그인 처리 중...</div>;
}
