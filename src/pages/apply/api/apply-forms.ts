import type { ApiResponse } from '@/pages/apply/types/api';
import { fetchWithAccess } from '@/shared/api/fetch-with-access';

function toQueryString(params?: unknown): string {
  if (!params || typeof params !== 'object') return '';

  const usp = new URLSearchParams();

  Object.entries(params as Record<string, unknown>).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    const convertValue = (v: unknown) => {
      if (v instanceof Date) return v.toISOString();
      if (typeof v === 'object') return JSON.stringify(v);
      return String(v);
    };

    if (Array.isArray(value)) {
      value.forEach((v) => usp.append(key, convertValue(v)));
      return;
    }

    usp.set(key, convertValue(value));
  });

  const qs = usp.toString();
  return qs ? `?${qs}` : '';
}

async function parseJson<T>(res: Response): Promise<T | null> {
  const text = await res.text();

  // 204 No Content는 body가 없는 것이 정상
  if (!text) {
    if (res.status === 204) return null;
    throw new Error('API 응답 본문이 비어있습니다.');
  }

  try {
    return JSON.parse(text) as T;
  } catch (error) {
    console.error('JSON 파싱 실패:', text, error);
    throw new Error('API 응답 파싱에 실패했습니다.');
  }
}

const DEFAULT_NO_CONTENT = {
  code: 'NO_CONTENT',
  message: '응답 본문이 비어있습니다.',
} as const;

async function parseApiResponse<T>(
  res: Response,
  noContent: { code: string; message: string } = DEFAULT_NO_CONTENT,
): Promise<ApiResponse<T>> {
  const json = await parseJson<ApiResponse<T>>(res);

  // 204 No Content 등으로 body가 없을 수 있음: ApiFailure로 정규화
  if (json === null) {
    return {
      success: false,
      code: noContent.code,
      message: noContent.message,
      data: null,
    };
  }

  return json;
}

export type InterviewTime = {
  date: string;
  startTime: string;
  endTime: string;
};

export type ApplyForm = {
  id?: string;
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
  interviewTimes: InterviewTime[];
  updatedAt?: string;
};

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
  interviewTimes: InterviewTime[];
};

/** 지원서 생성 */
export const createApplyForm = async (
  payload: CreateApplyFormPayload,
): Promise<ApiResponse<ApplyForm>> => {
  const res = await fetchWithAccess('/apply-forms/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseApiResponse<ApplyForm>(res, {
    code: 'NO_CONTENT',
    message: '지원서 생성 응답이 비어있습니다.',
  });
};

/** 지원서 조회 */
export const readApplyForm = async (params?: unknown): Promise<ApiResponse<ApplyForm>> => {
  const qs = toQueryString(params);
  const res = await fetchWithAccess(`/apply-forms/read${qs}`, {
    method: 'GET',
  });

  return parseApiResponse<ApplyForm>(res, {
    code: 'NO_CONTENT',
    message: '작성된 지원서를 찾을 수 없습니다.',
  });
};

/** 지원서 수정 */
export const updateApplyForm = async (
  payload: CreateApplyFormPayload,
): Promise<ApiResponse<ApplyForm>> => {
  const res = await fetchWithAccess('/apply-forms/update', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseApiResponse<ApplyForm>(res, {
    code: 'NO_CONTENT',
    message: '지원서 수정 응답이 비어있습니다.',
  });
};

/** 지원서 삭제 (soft delete) */
export const deleteApplyFormSoft = async (payload: { id: string }): Promise<ApiResponse<null>> => {
  const res = await fetchWithAccess('/apply-forms/delete_soft', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return parseApiResponse<null>(res, {
    code: 'NO_CONTENT',
    message: '지원서 삭제 응답이 비어있습니다.',
  });
};
