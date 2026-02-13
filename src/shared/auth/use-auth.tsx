import { useContext } from 'react';

import { AuthContext } from './auth-context';

// 어디서든 쉽게 쓰기 위한 훅
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내부에서 사용해야 합니다.');
  }
  return context;
}
