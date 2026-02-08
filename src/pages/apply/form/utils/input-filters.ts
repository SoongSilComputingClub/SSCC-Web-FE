/**
 * 입력 단계에서 사용하는 공용 필터 함수들
 * - React와 무관한 순수 함수로 유지
 * - 폼 어디에서든 재사용 가능
 */

/** 한글만 허용 (이름 입력 등) */
export const filterKoreanOnly = (raw: string): string => {
  return raw.replace(/[^가-힣]/g, '');
};

/** 숫자만 허용 (학번, 전화번호 등)
 * @param raw 입력값
 * @param maxLen 최대 길이 제한 (옵션)
 */
export const filterDigitsOnly = (raw: string, maxLen?: number): string => {
  const digits = raw.replace(/[^0-9]/g, '');
  return typeof maxLen === 'number' ? digits.slice(0, maxLen) : digits;
};

/**
 * 전화번호 자동 하이픈 포맷
 * 01012345678 → 010-1234-5678
 */
export const formatPhoneNumber = (raw: string): string => {
  const digits = filterDigitsOnly(raw, 11);

  if (digits.length <= 3) return digits;

  if (digits.length <= 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }

  return `${digits.slice(0, 3)}-${digits.slice(3, digits.length - 4)}-${digits.slice(
    digits.length - 4,
  )}`;
};
