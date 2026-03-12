import { fetchWithAccess } from '@/shared/api/fetch-with-access';

export type ApplyFormItem = {
  applyFormId: number;
  username: string;

  applicantName: string;
  department: string;
  studentNo: string;
  grade: number;
  gender: string;

  phone: string;
  introduce?: string;
  codingExp?: string;
  techStackText?: string;
  wantedValue?: string;
  aspiration?: string;
  interviewTimes?: Array<{ date: string; startTime: string; endTime: string }>;
};

export type GenderDistributionData = {
  maleCount: number;
  femaleCount: number;
  malePercentage: number;
  femalePercentage: number;
};

export type ExpLevelDistribution = {
  level: string;
  description: string;
  count: number;
  percentage: number;
};

export type CodingExpDistributionData = {
  totalCount: number;
  distributions: ExpLevelDistribution[];
};

type ApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data: T;
};

export async function readApplyForms(): Promise<ApiResponse<ApplyFormItem[]>> {
  const res = await fetchWithAccess('/admin/apply-forms');
  const json: ApiResponse<ApplyFormItem[]> = await res.json();

  if (!json.success) throw new Error(json.message);
  return json;
}

export async function readGenderDistribution() {
  const res = await fetchWithAccess('/admin/apply-forms/gender-distribution');
  const json: ApiResponse<GenderDistributionData> = await res.json();

  if (!json.success) throw new Error(json.message);
  return json;
}

export async function readCodingExpDistribution() {
  const res = await fetchWithAccess('/admin/apply-forms/coding-exp-distribution');
  const json: ApiResponse<CodingExpDistributionData> = await res.json();

  if (!json.success) throw new Error(json.message);
  return json;
}
