import axios from 'axios';

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
  codingLevel: string;
  techStackText: string;
  interviewTimes: Array<{ date: string; startTime: string; endTime: string }>;
};

/** 지원서 생성 */
export const createApplyForm = (payload: CreateApplyFormPayload) => {
  return axios.post('/api/apply-forms/create', payload);
};

/** 지원서 조회 */
export const readApplyForm = (params?: unknown) => {
  return axios.get('/api/apply-forms/read', { params });
};

/** 지원서 수정 */
export const updateApplyForm = (payload: unknown) => {
  return axios.put('/api/apply-forms/update', payload);
};

/** 지원서 삭제 (soft delete) */
export const deleteApplyFormSoft = (payload: unknown) => {
  return axios.delete('/api/apply-forms/delete_soft', {
    data: payload,
  });
};
