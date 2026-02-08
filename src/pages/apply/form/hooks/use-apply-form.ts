import { useRef, useState } from 'react';

export type Gender = 'male' | 'female' | null;
export type CodingExp = 'A' | 'B' | 'C' | 'D' | 'E' | null;

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

const scrollToRef = (ref: React.RefObject<HTMLElement | null>) => {
  ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  const el = ref.current;
  const focusable = el?.querySelector<HTMLElement>('input, textarea, select, button');
  focusable?.focus?.();
};

export const useApplyForm = () => {
  const [form, setForm] = useState<FormState>({
    applicantName: '',
    department: '',
    studentNo: '',
    grade: 1,
    phone: '',
    gender: null,
    introduce: '',
    codingExp: null,
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

  const validateField = (key: keyof FormState, value: unknown): string => {
    const v = typeof value === 'string' ? value.trim() : value;

    switch (key) {
      case 'applicantName':
        return v ? '' : '이름을 입력해주세요.';
      case 'department':
        return v ? '' : '학과를 입력해주세요.';
      case 'studentNo':
        return v && typeof v === 'string' && /^\d{8}$/.test(v)
          ? ''
          : '학번은 숫자 8자리여야 합니다.';
      case 'phone':
        return v && typeof v === 'string' && /^01[0-9]-?\d{3,4}-?\d{4}$/.test(v)
          ? ''
          : '전화번호를 정확히 입력해주세요.';
      case 'gender':
        return v ? '' : '성별을 선택해주세요.';
      case 'codingExp':
        return v ? '' : '코딩 경험을 선택해주세요.';
      case 'introduce':
        return typeof v === 'string' && v.length >= 30
          ? ''
          : '자기소개는 30자 이상 작성해주세요.';
      case 'wantedValue':
        return typeof v === 'string' && v.length >= 30
          ? ''
          : '얻고 싶은 가치를 30자 이상 작성해주세요.';
      case 'aspiration':
        return typeof v === 'string' && v.length >= 30
          ? ''
          : '포부를 30자 이상 작성해주세요.';
      case 'selectedInterviewKeys':
        return Array.isArray(v) && v.length > 0 ? '' : '면접 가능 시간을 선택해주세요.';
      default:
        return '';
    }
  };

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

    switch (firstInvalid) {
      case 'applicantName':
        scrollToRef(applicantNameRef);
        break;
      case 'department':
        scrollToRef(departmentRef);
        break;
      case 'studentNo':
        scrollToRef(studentNoRef);
        break;
      case 'grade':
        scrollToRef(gradeRef);
        break;
      case 'phone':
        scrollToRef(phoneRef);
        break;
      case 'gender':
        scrollToRef(genderRef);
        break;
      case 'codingExp':
        scrollToRef(codingExpRef);
        break;
      case 'introduce':
        scrollToRef(introduceRef);
        break;
      case 'wantedValue':
        scrollToRef(wantedValueRef);
        break;
      case 'aspiration':
        scrollToRef(aspirationRef);
        break;
      case 'selectedInterviewKeys':
        scrollToRef(interviewRef);
        break;
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