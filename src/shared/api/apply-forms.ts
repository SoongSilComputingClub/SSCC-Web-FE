import { fetchWithAccess } from '@/shared/api/fetch-with-access';

type ApiSuccess<T> = {
  success: boolean;
  code: string;
  message: string;
  data: T;
};

function toQueryString(params?: unknown): string {
  if (!params || typeof params !== 'object') return '';

  const usp = new URLSearchParams();

  Object.entries(params as Record<string, unknown>).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((v) => usp.append(key, String(v)));
      return;
    }

    usp.set(key, String(value));
  });

  const qs = usp.toString();
  return qs ? `?${qs}` : '';
}

async function parseJson<T>(res: Response): Promise<T> {
  // 응답이 비어있는 경우를 대비
  const text = await res.text();
  if (!text) return undefined as unknown as T;
  return JSON.parse(text) as T;
}

export type CreateApplyFormPayload = {
  applicantName: string;
  department: string;
  studentNo: string;
  grade: number;
  phone: string;
  gender: string;
  introduce: string;
  wantedValue: string;
  aspiration: string;
  codingExp: string;
  techStackText: string;
  interviewTimes: Array<{ date: string; startTime: string; endTime: string }>;
};

/** 지원서 생성 */
export const createApplyForm = async (payload: CreateApplyFormPayload) => {
  const res = await fetchWithAccess('/api/apply-forms/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseJson<ApiSuccess<unknown>>(res);
};

/** 지원서 조회 */
export const readApplyForm = async (params?: unknown) => {
  const qs = toQueryString(params);
  const res = await fetchWithAccess(`/api/apply-forms/read${qs}`, {
    method: 'GET',
  });

  return parseJson<ApiSuccess<unknown>>(res);
};

/** 지원서 수정 */
export const updateApplyForm = async (payload: unknown) => {
  const res = await fetchWithAccess('/api/apply-forms/update', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseJson<ApiSuccess<unknown>>(res);
};

/** 지원서 삭제 (soft delete) */
export const deleteApplyFormSoft = async (payload: unknown) => {
  const res = await fetchWithAccess('/api/apply-forms/delete_soft', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseJson<ApiSuccess<unknown>>(res);
};
