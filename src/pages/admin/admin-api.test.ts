import { beforeEach, describe, expect, it, vi } from 'vitest';

// ✅ 구현이 fetchWithAccess를 쓰므로 그걸 mock 해야 함
vi.mock('@/shared/api/fetch-with-access', () => ({
  fetchWithAccess: vi.fn(),
}));

import {
  readApplyForms,
  readCodingExpDistribution,
  readGenderDistribution,
  type CodingExpDistributionData,
  type GenderDistributionData,
} from '@/shared/api/admin-api';
import { fetchWithAccess } from '@/shared/api/fetch-with-access';

type ApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data: T;
};

const mockResponse = <T>(payload: ApiResponse<T>) =>
  ({ json: vi.fn().mockResolvedValue(payload) }) as unknown as Response;

describe('admin-api', () => {
  beforeEach(() => vi.clearAllMocks());

  it('readApplyForms: /admin/apply-forms 호출 + 성공 응답 반환', async () => {
    const payload: ApiResponse<unknown[]> = {
      success: true,
      code: 'OK',
      message: 'ok',
      data: [{ gender: 'male' }],
    };

    (fetchWithAccess as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockResponse(payload),
    );

    const res = await readApplyForms();

    expect(fetchWithAccess).toHaveBeenCalledWith('/admin/apply-forms');
    expect(res).toEqual(payload);
  });

  it('readApplyForms: success=false면 message로 throw', async () => {
    const payload: ApiResponse<unknown[]> = {
      success: false,
      code: 'ERR',
      message: 'fail',
      data: [],
    };

    (fetchWithAccess as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockResponse(payload),
    );

    await expect(readApplyForms()).rejects.toThrow('fail');
  });

  it('readGenderDistribution: /admin/apply-forms/gender-distribution 호출', async () => {
    const payload: ApiResponse<GenderDistributionData> = {
      success: true,
      code: 'OK',
      message: 'ok',
      data: { maleCount: 1, femaleCount: 2, malePercentage: 33.3, femalePercentage: 66.7 },
    };

    (fetchWithAccess as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockResponse(payload),
    );

    const res = await readGenderDistribution();

    expect(fetchWithAccess).toHaveBeenCalledWith('/admin/apply-forms/gender-distribution');
    expect(res).toEqual(payload);
  });

  it('readCodingExpDistribution: /admin/apply-forms/coding-exp-distribution 호출', async () => {
    const payload: ApiResponse<CodingExpDistributionData> = {
      success: true,
      code: 'OK',
      message: 'ok',
      data: {
        totalCount: 2,
        distributions: [{ level: 'BASIC', description: '기초', count: 2, percentage: 100 }],
      },
    };

    (fetchWithAccess as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockResponse(payload),
    );

    const res = await readCodingExpDistribution();

    expect(fetchWithAccess).toHaveBeenCalledWith('/admin/apply-forms/coding-exp-distribution');
    expect(res).toEqual(payload);
  });
});
