import { describe, it, expect } from 'vitest';

import { validateField } from './validation';

/**
 * 지원서 validation 로직 테스트
 * 실제 폼에서 사용하는 validateField를 직접 테스트합니다.
 */

describe('지원서 validation 테스트', () => {
  it('학번은 8자리 숫자여야 한다', () => {
    const valid = '20232217';
    const invalid = '1234';

    expect(validateField('studentNo', valid)).toBe('');
    expect(validateField('studentNo', invalid)).not.toBe('');
  });

  it('전화번호 형식이 올바른지 검사한다', () => {
    const valid = '010-1234-5678';
    const invalid1 = '01012345678';
    const invalid2 = '010-123-4567';

    expect(validateField('phone', valid)).toBe('');
    expect(validateField('phone', invalid1)).not.toBe('');
    expect(validateField('phone', invalid2)).not.toBe('');
  });

  it('성별이 올바른지 검사한다.', () => {
    expect(validateField('gender', 'male')).toBe('');
    expect(validateField('gender', 'female')).toBe('');
    expect(validateField('gender', 'other')).not.toBe('');
    expect(validateField('gender', '')).not.toBe('');
  });

  it('코딩 경험 선택이 올바른지 검사한다', () => {
    expect(validateField('codingExp', 'A')).toBe('');
    expect(validateField('codingExp', 'E')).toBe('');
    expect(validateField('codingExp', 'F')).not.toBe('');
    expect(validateField('codingExp', 'AA')).not.toBe('');
  });

  it('자기소개/가치/포부는 최소 30자 이상이어야 한다', () => {
    const valid = 'a'.repeat(30);
    const invalid = 'a'.repeat(10);

    expect(validateField('introduce', valid)).toBe('');
    expect(validateField('introduce', invalid)).not.toBe('');

    expect(validateField('wantedValue', valid)).toBe('');
    expect(validateField('wantedValue', invalid)).not.toBe('');

    expect(validateField('aspiration', valid)).toBe('');
    expect(validateField('aspiration', invalid)).not.toBe('');
  });

  it('면접 가능 시간은 1개 이상 선택해야 한다.', () => {
    expect(validateField('selectedInterviewKeys', [])).not.toBe('');
    expect(validateField('selectedInterviewKeys', ['2026-03-06|10:00|11:00'])).toBe('');
  });
});
