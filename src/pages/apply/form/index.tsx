import { useEffect, useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import {
  createApplyForm,
  updateApplyForm,
  type CreateApplyFormPayload,
} from '@/pages/apply/api/apply-forms';
import { useApplyFormRead } from '@/pages/apply/hooks/use-apply-form-read';

import { useApplyForm } from './hooks/use-apply-form';
import { useApplyFormPrefill } from './hooks/use-apply-form-prefill';
import BasicInfo from './sections/basic-info-section';
import ConsentSection from './sections/consent-section';
import FormHeaderSection from './sections/form-header';
import SubmitSection from './sections/submit-section';
import { parseInterviewKeys } from './utils/parse-interview-keys';

export default function ApplyPage() {
  const [consented, setConsented] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const consentRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const modeParam = searchParams.get('mode');
  const mode = modeParam === 'edit' ? 'edit' : 'new';

  const { data: readResult, isLoading: isReading } = useApplyFormRead();

  // prefill에 사용할 실제 지원서 데이터만 분리
  const existingApplyForm = readResult?.success === true ? readResult.data : null;

  const applyForm = useApplyForm();

  useApplyFormPrefill(existingApplyForm, applyForm);

  // URL로 edit로 들어왔지만 서버에 기존 지원서가 없으면 new로 전환
  const hasExisting = existingApplyForm != null;
  // 실제로 서버에 기존 지원서가 있을 때만 수정 모드로 동작
  const isEdit = mode === 'edit' && hasExisting;

  useEffect(() => {
    if (mode === 'edit' && !isReading && !hasExisting) {
      toast.message('작성된 지원서가 없어 새로 작성 페이지로 이동합니다.');
      navigate('/apply/form?mode=new', { replace: true });
    }
  }, [mode, isReading, hasExisting, navigate]);

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

    const interviewTimes = parseInterviewKeys(form.selectedInterviewKeys);
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
      if (isEdit) {
        await updateApplyForm(payload);
        await queryClient.invalidateQueries({ queryKey: ['apply-forms', 'read'] });
        navigate('/apply', { replace: true });
        toast.success('지원서가 수정되었습니다.', {
          duration: 2500,
        });
      } else {
        await createApplyForm(payload);
        await queryClient.invalidateQueries({ queryKey: ['apply-forms', 'read'] });
        navigate('/apply', { replace: true });
        toast.success('신청이 완료되었습니다.', {
          duration: 2500,
        });
      }
    } catch (e) {
      console.error(e);
      toast.error(
        isEdit ? '지원서 수정 중 오류가 발생했습니다.' : '지원서 제출 중 오류가 발생했습니다.',
        {
          duration: 4000,
        },
      );
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
      <BasicInfo applyForm={applyForm} />
      <SubmitSection
        disabled={!consented || isSubmitting || (isEdit && isReading)}
        disabledReason={
          !consented
            ? 'CONSENT'
            : isSubmitting
              ? 'SUBMITTING'
              : isEdit && isReading
                ? 'LOADING'
                : undefined
        }
        onSubmit={handleSubmit}
      />
    </div>
  );
}
