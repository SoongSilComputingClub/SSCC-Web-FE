import { beforeEach, describe, expect, it, vi } from 'vitest';

// ✅ fetchWithAccess를 mock
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

// ✅ Response 모의 객체 생성 (admin-api.ts는 res.json()만 씀)
function mockResponse<T>(payload: ApiResponse<T>) {
  return { json: vi.fn().mockResolvedValue(payload) } as unknown as Response;
}

describe('admin-api', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('readApplyForms: 성공 시 응답을 반환하고 endpoint를 정확히 호출한다', async () => {
    const payload: ApiResponse<unknown[]> = {
      success: true,
      code: 'OK',
      message: 'ok',
      data: [{ gender: 'male' }, { gender: 'female' }],
    };

    (fetchWithAccess as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockResponse(payload),
    );

    const res = await readApplyForms();

    expect(fetchWithAccess).toHaveBeenCalledWith('/admin/apply-forms');
    expect(res).toEqual(payload);
  });

  it('readApplyForms: success=false면 message로 Error를 throw한다', async () => {
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

  it('readGenderDistribution: 성공 시 응답을 반환한다', async () => {
    const payload: ApiResponse<GenderDistributionData> = {
      success: true,
      code: 'OK',
      message: 'ok',
      data: {
        maleCount: 10,
        femaleCount: 5,
        malePercentage: 66.6,
        femalePercentage: 33.4,
      },
    };

    (fetchWithAccess as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockResponse(payload),
    );

    const res = await readGenderDistribution();

    expect(fetchWithAccess).toHaveBeenCalledWith('/admin/apply-forms/gender-distribution');
    expect(res).toEqual(payload);
  });

  it('readGenderDistribution: success=false면 Error를 throw한다', async () => {
    const payload: ApiResponse<GenderDistributionData> = {
      success: false,
      code: 'ERR',
      message: '권한 없음',
      data: {
        maleCount: 0,
        femaleCount: 0,
        malePercentage: 0,
        femalePercentage: 0,
      },
    };

    (fetchWithAccess as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockResponse(payload),
    );

    await expect(readGenderDistribution()).rejects.toThrow('권한 없음');
  });

  it('readCodingExpDistribution: 성공 시 응답을 반환한다', async () => {
    const payload: ApiResponse<CodingExpDistributionData> = {
      success: true,
      code: 'OK',
      message: 'ok',
      data: {
        totalCount: 3,
        distributions: [
          { level: 'NONE', description: '없음', count: 1, percentage: 33.3 },
          { level: 'BASIC', description: '기초', count: 2, percentage: 66.7 },
        ],
      },
    };

    (fetchWithAccess as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockResponse(payload),
    );

    const res = await readCodingExpDistribution();

    expect(fetchWithAccess).toHaveBeenCalledWith('/admin/apply-forms/coding-exp-distribution');
    expect(res).toEqual(payload);
  });

  it('readCodingExpDistribution: success=false면 Error를 throw한다', async () => {
    const payload: ApiResponse<CodingExpDistributionData> = {
      success: false,
      code: 'ERR',
      message: 'fail',
      data: { totalCount: 0, distributions: [] },
    };

    (fetchWithAccess as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockResponse(payload),
    );

    await expect(readCodingExpDistribution()).rejects.toThrow('fail');
  });

  it('공통: fetchWithAccess가 reject되면 그대로 throw된다', async () => {
    (fetchWithAccess as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('network error'),
    );

    await expect(readApplyForms()).rejects.toThrow('network error');
  });
});
