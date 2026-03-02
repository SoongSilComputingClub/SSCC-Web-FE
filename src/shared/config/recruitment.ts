/**
 * 모집 / 지원 접수 기간 설정 파일 (KST 기준)
 *
 * - 모든 날짜는 반드시 KST(+09:00)가 포함된 ISO 문자열로 관리합니다.
 * - UI, 가드 로직, 스케줄 표시 등은 모두 이 파일을 단일 기준(Single Source of Truth)으로 사용합니다.
 * - 기수 변경 시 이 파일만 수정하면 되도록 설계되었습니다.
 */

// 접수 가능 기간 (실제 로직 기준)
// ※ 매 기수마다 반드시 수정해야 하는 값
// TO DO : 실제 날짜로 변경하기
export const APPLICATION_OPEN_AT_ISO = '2026-02-24T00:00:00+09:00'; // 접수 시작 시각
export const APPLICATION_CLOSE_AT_ISO = '2026-03-06T23:59:59+09:00'; // 접수 마감 시각

export const APPLICATION_OPEN_AT = new Date(APPLICATION_OPEN_AT_ISO);
export const APPLICATION_CLOSE_AT = new Date(APPLICATION_CLOSE_AT_ISO);

// 모집 일정 섹션 (UI 표시용 데이터)
// - 실제 접수 가능 여부 판단 로직과는 분리된 "표시용" 데이터입니다.
// - UI에서 날짜 포맷팅을 하거나 타임라인/스케줄 컴포넌트에 사용합니다.
export type RecruitmentScheduleItem = {
  /** 일정 제목 (예: 서류 접수, 면접, 결과 발표 등) */
  title: string;

  /**
   * 일정에 대한 부가 설명
   * 예: 장소, 비고, 유의사항
   */
  description?: string;

  /**
   * 특정 시점에 진행되는 일정일 경우 사용
   * 예: 결과 발표 시각
   */
  atIso?: string;

  /**
   * 기간을 가지는 일정일 경우 사용
   * 예: 서류 접수 기간, 면접 기간
   */
  range?: {
    startIso: string;
    endIso: string;
  };
};

export const RECRUITMENT_SCHEDULE: RecruitmentScheduleItem[] = [
  {
    title: '서류 접수',
    range: {
      startIso: APPLICATION_OPEN_AT_ISO,
      endIso: APPLICATION_CLOSE_AT_ISO,
    },
    description: '접수 기간 내에만 지원서 작성 및 제출이 가능합니다.',
  },
  {
    title: '면접',
    range: {
      startIso: '2026-03-03T10:00:00+09:00',
      endIso: '2026-03-08T20:00:00+09:00',
    },
  },
  {
    title: '결과 발표',
    range: {
      startIso: '2026-03-08T00:00:00+09:00',
      endIso: '2026-03-09T23:59:59+09:00',
    },
  },
];

// 접수 상태별 안내 문구 (UI 가드용)
// - 접수 가능 여부에 따라 화면에 표시할 문구를 정의합니다.
// - 컴포넌트에서는 상태(open / closed)만 판단해서 사용합니다.
export const APPLICATION_GUARD_COPY = {
  /** 접수 진행 */
  open: {
    title: 'SSCC는 여러분을 기다립니다!',
    body: '지금 바로 SSCC에 지원하세요',
    cta: {
      unauth: {
        label: '지원 전 구글 로그인',
        action: 'login' as const,
      },
      auth: {
        /* 로그인 후 제출된 지원서 없는 경우 */
        new: {
          label: '신청서 작성하기',
          action: 'apply' as const,
        },

        /* 제출된 지원서 존재하는 경우 */
        existing: {
          title: '아직 수정할 내용이 남았나요?',
          body: '버튼을 눌러 수정하세요!',
          label: '지원서 수정하기',
          action: 'edit' as const,
        },
      },
    },
  },

  /** 접수 마감 */
  closed: {
    title: '지금은 SSCC 신청 기간이\n아닙니다.',
    body: '',
    cta: null,
  },
} as const;

export type ApplicationPhase = keyof typeof APPLICATION_GUARD_COPY;
export type ApplicationCtaAction = 'login' | 'apply' | 'edit';
export type ApplicationAuthCtaKey = 'new' | 'existing';
export type ApplicationCtaKey = 'unauth' | 'auth';
