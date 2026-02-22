import { useQuery } from '@tanstack/react-query';

import { readApplyForm, type ApplyForm } from '@/pages/apply/api/apply-forms';
import type { ApiResponse } from '@/pages/apply/types/api';
import { useAuth } from '@/shared/auth/use-auth';

export function useApplyFormRead() {
  const { isLoggedIn } = useAuth();

  return useQuery<ApiResponse<ApplyForm>>({
    queryKey: ['apply-forms', 'read'],
    enabled: isLoggedIn,
    retry: false,
    queryFn: readApplyForm,
    staleTime: 60_000,
  });
}
