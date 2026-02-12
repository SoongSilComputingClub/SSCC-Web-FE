import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { AuthContext } from './auth-context';

import type { AuthContextType } from './auth-context';

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // 앱 시작 시 localStorage에서 토큰 읽기
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  // 같은 탭에서 토큰 변경 시 상태 동기화
  useEffect(() => {
    const syncAuth = () => {
      const storedToken = localStorage.getItem('accessToken');
      setAccessToken(storedToken);
    };

    window.addEventListener('auth-changed', syncAuth);
    return () => {
      window.removeEventListener('auth-changed', syncAuth);
    };
  }, []);

  // 로그인 처리
  const login = (newAccessToken: string, newRefreshToken: string) => {
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    setAccessToken(newAccessToken);
    window.dispatchEvent(new Event('auth-changed'));
  };

  // 로그아웃 처리
  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    try {
      if (refreshToken) {
        await fetch(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });
      }
    } catch (err) {
      console.error('로그아웃 요청 실패:', err);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setAccessToken(null);
      window.dispatchEvent(new Event('auth-changed'));
      // 로그아웃 후에는 현재 페이지를 유지 (필요하면 각 페이지에서 별도 처리)
      // window.location.href = "/login";
    }
  };

  const value: AuthContextType = {
    isLoggedIn: !!accessToken,
    accessToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
