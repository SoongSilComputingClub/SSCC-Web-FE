import { useRef, useState } from 'react';

import { validateField } from '../utils/validation';

export type Gender = 'MALE' | 'FEMALE' | '';
export type CodingExp = 'A' | 'B' | 'C' | 'D' | 'E' | '';

export type FormState = {
  applicantName: string;
  department: string;
  studentNo: string;
  grade: number;
  phone: string;
  gender: Gender;
  introduce: string;
  codingExp: CodingExp;
  techStackText: string; // optional
  selectedInterviewKeys: string[];
  wantedValue: string;
  aspiration: string;
};

const SCROLL_CENTER_OFFSET = 0; // 필요하면 미세 조정

const scrollToRef = (ref: React.RefObject<HTMLElement | null>) => {
  const el = ref.current;
  if (!el) return;

  // window.scrollTo 기반으로 목표 y를 계산해 부드럽게 이동
  const rect = el.getBoundingClientRect();
  const viewportCenter = window.innerHeight / 2;
  const elementCenter = rect.top + rect.height / 2;
  const deltaToCenter = elementCenter - viewportCenter;
  const targetY = window.scrollY + deltaToCenter + SCROLL_CENTER_OFFSET;

  window.scrollTo({
    top: Math.max(0, targetY),
    behavior: 'smooth',
  });

  // 스크롤 시작 후 다음 프레임에 preventScroll 옵션으로 포커스만 이동
  const focusable = el.querySelector<HTMLElement>('input, textarea, select, button');
  if (focusable?.focus) {
    requestAnimationFrame(() => {
      try {
        focusable.focus({ preventScroll: true } as FocusOptions);
      } catch {
        focusable.focus();
      }
    });
  }
};

export const useApplyForm = () => {
  const [form, setForm] = useState<FormState>({
    applicantName: '',
    department: '',
    studentNo: '',
    grade: 1,
    phone: '',
    gender: '',
    introduce: '',
    codingExp: '',
    techStackText: '',
    selectedInterviewKeys: [],
    wantedValue: '',
    aspiration: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});

  // scroll targets
  const applicantNameRef = useRef<HTMLDivElement | null>(null);
  const departmentRef = useRef<HTMLDivElement | null>(null);
  const studentNoRef = useRef<HTMLDivElement | null>(null);
  const gradeRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const genderRef = useRef<HTMLDivElement | null>(null);
  const codingExpRef = useRef<HTMLDivElement | null>(null);
  const introduceRef = useRef<HTMLDivElement | null>(null);
  const wantedValueRef = useRef<HTMLDivElement | null>(null);
  const aspirationRef = useRef<HTMLDivElement | null>(null);
  const interviewRef = useRef<HTMLDivElement | null>(null);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    if (touched[key]) {
      const msg = validateField(key, value);
      setErrors((prev) => ({ ...prev, [key]: msg || undefined }));
    }
  };

  const touchField = (key: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const msg = validateField(key, form[key]);
    setErrors((prev) => ({ ...prev, [key]: msg || undefined }));
  };

  const setFieldAndTouch = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setForm((prev) => ({ ...prev, [key]: value }));

    const msg = validateField(key, value);
    setErrors((prev) => ({ ...prev, [key]: msg || undefined }));
  };

  /**
   * 여러 필드를 한 번에 병합해서 세팅합니다.
   * prefill(수정 진입 시 기존 데이터 주입) 용도로 사용합니다.
   * - touched/validation을 건드리지 않음
   */
  const patchForm = (next: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...next }));
  };

  /** prefill 직후 검증 UI가 뜨지 않도록 touched/errors를 초기화합니다. */
  const resetValidation = () => {
    setErrors({});
    setTouched({});
  };

  const validateAllAndScroll = () => {
    setTouched({
      applicantName: true,
      department: true,
      studentNo: true,
      grade: true,
      phone: true,
      gender: true,
      codingExp: true,
      introduce: true,
      wantedValue: true,
      aspiration: true,
      selectedInterviewKeys: true,
    });

    const next: Partial<Record<keyof FormState, string>> = {};
    (Object.keys(form) as Array<keyof FormState>).forEach((k) => {
      const msg = validateField(k, form[k]);
      if (msg) next[k] = msg;
    });

    setErrors(next);

    const order: Array<keyof FormState> = [
      'applicantName',
      'department',
      'studentNo',
      'grade',
      'phone',
      'gender',
      'codingExp',
      'introduce',
      'wantedValue',
      'aspiration',
      'selectedInterviewKeys',
    ];

    const firstInvalid = order.find((k) => next[k]);

    if (!firstInvalid) return true;

    const refMap: Partial<Record<keyof FormState, React.RefObject<HTMLElement | null>>> = {
      applicantName: applicantNameRef,
      department: departmentRef,
      studentNo: studentNoRef,
      grade: gradeRef,
      phone: phoneRef,
      gender: genderRef,
      codingExp: codingExpRef,
      introduce: introduceRef,
      wantedValue: wantedValueRef,
      aspiration: aspirationRef,
      selectedInterviewKeys: interviewRef,
    };

    const refToScroll = refMap[firstInvalid];
    if (refToScroll) {
      scrollToRef(refToScroll);
    }

    return false;
  };

  return {
    form,
    errors,
    touched,
    setField,
    touchField,
    setFieldAndTouch,
    patchForm,
    resetValidation,
    validateAllAndScroll,

    refs: {
      applicantNameRef,
      departmentRef,
      studentNoRef,
      gradeRef,
      phoneRef,
      genderRef,
      codingExpRef,
      introduceRef,
      wantedValueRef,
      aspirationRef,
      interviewRef,
    },
  };
};

export type UseApplyFormReturn = ReturnType<typeof useApplyForm>;
