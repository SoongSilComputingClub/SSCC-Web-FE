import { useEffect, useRef } from 'react';

import type { ApplyForm } from '@/pages/apply/api/apply-forms';

const normalizeDate = (v: string) => (v.includes('T') ? v.split('T')[0] : v);
const normalizeHm = (v: string) => (v.length >= 5 ? v.slice(0, 5) : v);

type ApplyFormController<TForm extends Record<string, unknown>> = {
  patchForm?: (next: Partial<TForm>) => void;
  setForm?: (updater: (prev: TForm) => TForm) => void;
  setState?: (updater: (prev: TForm) => TForm) => void;
  resetValidation?: () => void;
};

/**
 * /apply-forms/read 응답을 폼 상태에 주입(prefill)하는 전용 훅
 * - edit 모드에서 기존 지원서 데이터를 입력창에 채워넣기 위해 사용
 */
type PrefillShape = {
  applicantName: string;
  department: string;
  studentNo: string;
  grade: number;
  phone: string;
  gender?: unknown;
  introduce: string;
  wantedValue: string;
  aspiration: string;
  codingExp: string;
  techStackText: string;
  selectedInterviewKeys: string[];
};

export function useApplyFormPrefill<TForm extends PrefillShape & Record<string, unknown>>(
  existingApplyForm: ApplyForm | null | undefined,
  applyForm: ApplyFormController<TForm>,
) {
  // prefill이 매 렌더마다 다시 실행되면 사용자가 입력한 값이 계속 덮어써져서 "수정이 안 되는" 현상이 생김
  // 기존 지원서(조회 결과)가 바뀌었을 때만 1회 prefill 하도록 가드
  const lastPrefillKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (!existingApplyForm) {
      lastPrefillKeyRef.current = null;
      return;
    }

    // 서버 응답이 refetch 등으로 객체 참조가 바뀌어도, 동일한 지원서면 다시 덮어쓰지 않도록 key를 만든다
    const key =
      existingApplyForm.id ??
      existingApplyForm.updatedAt ??
      JSON.stringify(existingApplyForm.interviewTimes ?? null);

    if (lastPrefillKeyRef.current === key) return;

    // 서버 interviewTimes -> UI 선택 키(YYYY-MM-DD|HH:mm|HH:mm)로 변환
    const selectedInterviewKeys = Array.isArray(existingApplyForm.interviewTimes)
      ? existingApplyForm.interviewTimes.map((t) => {
          const date = normalizeDate(t.date);
          const startTime = normalizeHm(t.startTime);
          const endTime = normalizeHm(t.endTime);
          return `${date}|${startTime}|${endTime}`;
        })
      : [];

    const next = {
      applicantName: existingApplyForm.applicantName ?? '',
      department: existingApplyForm.department ?? '',
      studentNo: existingApplyForm.studentNo ?? '',
      grade: existingApplyForm.grade ?? 0,
      phone: existingApplyForm.phone ?? '',
      // FormState 쪽 Gender 유니온과의 호환을 위해 "없음"은 undefined로 둔다
      gender: existingApplyForm.gender ?? undefined,
      introduce: existingApplyForm.introduce ?? '',
      wantedValue: existingApplyForm.wantedValue ?? '',
      aspiration: existingApplyForm.aspiration ?? '',
      codingExp: existingApplyForm.codingExp ?? '',
      techStackText: existingApplyForm.techStackText ?? '',
      selectedInterviewKeys,
    } satisfies Partial<PrefillShape>;

    // 아래에서 patchForm/setForm/setState 중 하나로 실제 주입이 성공하면 key를 저장
    // useApplyForm 구현에 따라 patchForm/resetValidation 등을 사용

    const partial = next as Partial<TForm>;

    const didUpdate = (() => {
      if (typeof applyForm.patchForm === 'function') {
        applyForm.patchForm(partial);
        return true;
      }

      if (typeof applyForm.setForm === 'function') {
        applyForm.setForm((prev) => ({ ...prev, ...partial }) as TForm);
        return true;
      }

      if (typeof applyForm.setState === 'function') {
        applyForm.setState((prev) => ({ ...prev, ...partial }) as TForm);
        return true;
      }

      return false;
    })();

    if (!didUpdate) return;

    if (typeof applyForm.resetValidation === 'function') applyForm.resetValidation();
    lastPrefillKeyRef.current = key;
  }, [existingApplyForm, applyForm]);
}
