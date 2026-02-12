import { useRef, useState } from 'react';

import { createApplyForm, type CreateApplyFormPayload } from '@/shared/api/apply-forms';

import { useApplyForm } from './hooks/use-apply-form';
import BasicInfo from './sections/basic-info-section';
import ConsentSection from './sections/consent-section';
import FormHeaderSection from './sections/form-header';
import SubmitSection from './sections/submit-section';

export default function ApplyPage() {
  const [consented, setConsented] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const consentRef = useRef<HTMLDivElement | null>(null);
  const basicInfoValidateRef = useRef<null | (() => boolean)>(null);

  const applyForm = useApplyForm();

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!consented) {
      consentRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
      return;
    }

    if (!applyForm.validateAllAndScroll()) return;
    const { form } = applyForm;

    const interviewTimes = form.selectedInterviewKeys
      .map((key) => {
        if (key.includes('|')) {
          const [date, startTime, endTime] = key.split('|');
          if (!date || !startTime || !endTime) return null;
          return { date, startTime, endTime };
        }

        const m = key.match(/(\d{4}-\d{2}-\d{2}).*?(\d{2}:\d{2}).*?(\d{2}:\d{2})/);
        if (!m) return null;
        return { date: m[1], startTime: m[2], endTime: m[3] };
      })
      .filter((v): v is { date: string; startTime: string; endTime: string } => v !== null);
    const payload: CreateApplyFormPayload = {
      applicantName: form.applicantName,
      department: form.department,
      studentNo: form.studentNo,
      grade: form.grade,
      phone: form.phone,
      gender: form.gender ?? '',
      introduce: form.introduce,
      wantedValue: form.wantedValue,
      aspiration: form.aspiration,
      codingExp: form.codingExp ?? '',
      techStackText: form.techStackText,
      interviewTimes,
    };

    setIsSubmitting(true);
    try {
      await createApplyForm(payload);
      alert('지원서가 성공적으로 제출되었습니다.');
    } catch (e) {
      console.error(e);
      alert('지원서 제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-col gap-6 bg-bg-default">
      <FormHeaderSection />
      <div ref={consentRef}>
        <ConsentSection onConsentChange={setConsented} />
      </div>
      <BasicInfo
        applyForm={applyForm}
        registerValidator={(fn) => (basicInfoValidateRef.current = fn)}
      />
      <SubmitSection
        disabled={!consented || isSubmitting}
        disabledReason={!consented ? 'CONSENT' : isSubmitting ? 'SUBMITTING' : undefined}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
