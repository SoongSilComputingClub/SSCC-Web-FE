import axios from 'axios';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { readApplyForms } from '@/shared/api/admin-api';

vi.mock('axios');

describe('API 테스트: readApplyForms', () => {
  const TEST_TOKEN = 'test-access-token';

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('[성공] 토큰을 헤더에 싣고, 성공 데이터를 반환해야 한다', async () => {
    const mockSuccessResponse = {
      success: true,
      data: [{ applicantName: '홍길동', department: '컴공' }],
      message: '조회 성공',
    };

    vi.mocked(axios.get).mockResolvedValue({ data: mockSuccessResponse });

    const result = await readApplyForms(TEST_TOKEN);

    expect(result).toEqual(mockSuccessResponse);

    expect(axios.get).toHaveBeenCalledWith(
      'api/apply-forms/read',
      expect.objectContaining({
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${TEST_TOKEN}`,
        },
        validateStatus: expect.any(Function),
      }),
    );
  });

  test('[실패 - 로직] success가 false면 에러를 던져야 한다 (404 등 포함)', async () => {
    const mockFailResponse = {
      success: false,
      message: '작성된 지원서를 찾을 수 없습니다.',
      data: null,
    };

    vi.mocked(axios.get).mockResolvedValue({ data: mockFailResponse });

    await expect(readApplyForms(TEST_TOKEN)).rejects.toThrow('작성된 지원서를 찾을 수 없습니다.');
  });

  test('[실패 - 네트워크] 아예 통신이 안 되면 에러를 던져야 한다', async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error('Network Error'));

    await expect(readApplyForms(TEST_TOKEN)).rejects.toThrow('Network Error');
  });
});
