import { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/shared/auth/use-auth';

export default function CookiePage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const didRunRef = useRef(false);

  useEffect(() => {
    if (didRunRef.current) return;
    didRunRef.current = true;

    // 이미 토큰이 저장된 상태면(이중 호출/새로고침 등) 바로 리다이렉트
    const existingAccess = localStorage.getItem('accessToken');
    if (existingAccess) {
      const redirectTo = sessionStorage.getItem('postLoginRedirect') ?? '/apply';
      sessionStorage.removeItem('postLoginRedirect');
      navigate(redirectTo, { replace: true });
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

        // 로그인 전 사용자가 가려던 경로가 있으면 그쪽으로, 없으면 /apply로 이동
        const redirectTo = sessionStorage.getItem('postLoginRedirect') ?? '/apply';
        sessionStorage.removeItem('postLoginRedirect');
        navigate(redirectTo, { replace: true });
      } catch (err) {
        console.error('토큰 교환 실패:', err);

        // 이미 토큰이 있으면(첫 요청 성공 후 추가 요청 실패 등) 실패 알림 없이 진행
        if (localStorage.getItem('accessToken')) {
          const redirectTo = sessionStorage.getItem('postLoginRedirect') ?? '/apply';
          sessionStorage.removeItem('postLoginRedirect');
          navigate(redirectTo, { replace: true });
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
