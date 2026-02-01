

import { describe, expect, it } from 'vitest';

import {
  APPLICATION_CLOSE_AT_ISO,
  APPLICATION_OPEN_AT_ISO,
} from '@/shared/config/recruitment';
import { getApplicationPhase, isApplicationOpen } from './recruitment';

describe('recruitment period guard', () => {
  it('시작 시각에는 지원 가능해야 한다 (start inclusive)', () => {
    const start = new Date(APPLICATION_OPEN_AT_ISO);
    expect(isApplicationOpen(start)).toBe(true);
    expect(getApplicationPhase(start)).toBe('open');
  });

  it('종료 시각에는 지원 가능해야 한다 (end inclusive)', () => {
    const end = new Date(APPLICATION_CLOSE_AT_ISO);
    expect(isApplicationOpen(end)).toBe(true);
    expect(getApplicationPhase(end)).toBe('open');
  });

  it('시작 1초 전에는 지원 불가해야 한다', () => {
    const beforeStart = new Date(new Date(APPLICATION_OPEN_AT_ISO).getTime() - 1000);
    expect(isApplicationOpen(beforeStart)).toBe(false);
    expect(getApplicationPhase(beforeStart)).toBe('closed');
  });

  it('종료 1초 후에는 지원 불가해야 한다', () => {
    const afterEnd = new Date(new Date(APPLICATION_CLOSE_AT_ISO).getTime() + 1000);
    expect(isApplicationOpen(afterEnd)).toBe(false);
    expect(getApplicationPhase(afterEnd)).toBe('closed');
  });
});