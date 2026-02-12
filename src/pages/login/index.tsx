import { useEffect } from 'react';
export default function LoginPage() {
  const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

  useEffect(() => {
    if (!BACKEND_API_BASE_URL) return;

    window.location.href = `${BACKEND_API_BASE_URL}/oauth2/authorization/google`;
  }, [BACKEND_API_BASE_URL]);

  return (
    <div className="flex min-h-screen items-center justify-center text-text-default">
      로딩 중...
    </div>
  );
}
