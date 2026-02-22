import type { FormState } from '../hooks/use-apply-form';

type Validator = (value: unknown) => string;

const asTrimmedString = (value: unknown) => (typeof value === 'string' ? value.trim() : value);

const requiredText =
  (message: string): Validator =>
  (value) => {
    const v = asTrimmedString(value);
    return typeof v === 'string' && v.length > 0 ? '' : message;
  };

const match =
  (re: RegExp, message: string): Validator =>
  (value) => {
    const v = asTrimmedString(value);
    return typeof v === 'string' && re.test(v) ? '' : message;
  };

const minLen =
  (min: number, message: string): Validator =>
  (value) => {
    const v = asTrimmedString(value);
    return typeof v === 'string' && v.length >= min ? '' : message;
  };

const oneOf =
  <T extends string>(allowed: readonly T[], message: string): Validator =>
  (value) => {
    const v = asTrimmedString(value);
    return typeof v === 'string' && (allowed as readonly string[]).includes(v) ? '' : message;
  };

const nonEmptyArray =
  (message: string): Validator =>
  (value) => {
    return Array.isArray(value) && value.length > 0 ? '' : message;
  };

const validators: Partial<Record<keyof FormState, Validator>> = {
  applicantName: requiredText('이름을 입력해주세요.'),
  department: requiredText('학과를 입력해주세요.'),
  studentNo: match(/^\d{8}$/, '학번은 숫자 8자리여야 합니다.'),
  phone: match(/^01\d-\d{4}-\d{4}$/, '전화번호를 정확히 입력해주세요.'),
  gender: oneOf(['FEMALE', 'MALE'] as const, '성별을 선택해주세요.'),
  codingExp: match(/^[A-E]$/, '코딩 경험을 선택해주세요.'),
  introduce: minLen(30, '자기소개는 30자 이상 작성해주세요.'),
  wantedValue: minLen(30, '얻고 싶은 가치를 30자 이상 작성해주세요.'),
  aspiration: minLen(30, '포부를 30자 이상 작성해주세요.'),
  selectedInterviewKeys: nonEmptyArray('면접 가능 시간을 선택해주세요.'),
};

export const validateField = (key: keyof FormState, value: unknown): string => {
  const validator = validators[key];
  return validator ? validator(value) : '';
};
