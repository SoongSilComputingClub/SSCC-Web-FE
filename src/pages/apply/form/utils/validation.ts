import type { FormState } from '../hooks/use-apply-form';

export const validateField = (key: keyof FormState, value: unknown): string => {
  const v = typeof value === 'string' ? value.trim() : value;

  switch (key) {
    case 'applicantName':
      return v ? '' : '이름을 입력해주세요.';
    case 'department':
      return v ? '' : '학과를 입력해주세요.';
    case 'studentNo':
      return v && typeof v === 'string' && /^\d{8}$/.test(v) ? '' : '학번은 숫자 8자리여야 합니다.';
    case 'phone':
      return v && typeof v === 'string' && /^01[0-9]-\d{4}-\d{4}$/.test(v)
        ? ''
        : '전화번호를 정확히 입력해주세요.';
    case 'gender':
      return typeof v === 'string' && (v === 'FEMALE' || v === 'MALE')
        ? ''
        : '성별을 선택해주세요.';
    case 'codingExp':
      return typeof v === 'string' && /^[A-E]$/.test(v) ? '' : '코딩 경험을 선택해주세요.';
    case 'introduce':
      return typeof v === 'string' && v.length >= 30 ? '' : '자기소개는 30자 이상 작성해주세요.';
    case 'wantedValue':
      return typeof v === 'string' && v.length >= 30
        ? ''
        : '얻고 싶은 가치를 30자 이상 작성해주세요.';
    case 'aspiration':
      return typeof v === 'string' && v.length >= 30 ? '' : '포부를 30자 이상 작성해주세요.';
    case 'selectedInterviewKeys':
      return Array.isArray(v) && v.length > 0 ? '' : '면접 가능 시간을 선택해주세요.';
    default:
      return '';
  }
};
