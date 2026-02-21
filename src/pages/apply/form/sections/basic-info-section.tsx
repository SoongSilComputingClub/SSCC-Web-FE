import { useState } from 'react';

import CodingExpDescription from '../components/coding-exp-description';
import ErrorText from '../components/error-text';
import FormSectionHeader from '../components/form-section-header';
import InterviewDayCard from '../components/interview-day-card';
import { CODING_EXP_OPTIONS } from '../constants/coding-exp-options';
import { filterDigitsOnly, formatPhoneNumber } from '../utils/input-filters';
import { INTERVIEW_OPTIONS } from '../utils/interview-options';

import type { UseApplyFormReturn } from '../hooks/use-apply-form';

type BasicInfoProps = {
  readonly applyForm: UseApplyFormReturn;
};

export default function BasicInfo({ applyForm }: BasicInfoProps) {
  const { form, errors, touched, setField, touchField, setFieldAndTouch, refs } = applyForm;
  const {
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
  } = refs;

  const [openCodingExp, setOpenCodingExp] = useState<
    (typeof CODING_EXP_OPTIONS)[number]['value'] | null
  >(null);

  const toggleSlot = (key: string) => {
    const nextSelected = form.selectedInterviewKeys.includes(key)
      ? form.selectedInterviewKeys.filter((k: string) => k !== key)
      : [...form.selectedInterviewKeys, key];

    setFieldAndTouch('selectedInterviewKeys', nextSelected);
  };

  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-col gap-4 bg-bg-default px-4">
      <div className="rounded-[20px] bg-bg-muted px-5">
        {/* 기본 정보 */}
        <section className="mt-8">
          <FormSectionHeader title="기본 정보" />

          <div className="mt-6 space-y-6">
            <div ref={applicantNameRef}>
              <label
                htmlFor="applicantName"
                className="block text-sm font-semibold text-text-default"
              >
                이름<span className="ml-1 text-point">*</span>
              </label>
              <input
                id="applicantName"
                value={form.applicantName}
                onChange={(e) => setField('applicantName', e.target.value)}
                onBlur={() => touchField('applicantName')}
                className="mt-3 w-full rounded-[20px] border border-border-emphasis bg-bg-section p-4 text-text-default placeholder:text-text-default/40 focus:outline-none focus:ring-2 focus:ring-point/40"
                placeholder="이름을 기입하세요."
              />
              <ErrorText show={touched.applicantName} message={errors.applicantName} />
            </div>

            <div ref={departmentRef}>
              <label htmlFor="department" className="block text-sm font-semibold text-text-default">
                학과<span className="ml-1 text-point">*</span>
              </label>
              <input
                id="department"
                value={form.department}
                onChange={(e) => setField('department', e.target.value)}
                onBlur={() => touchField('department')}
                className="mt-3 w-full rounded-[20px] border border-border-emphasis bg-bg-section p-4 text-text-default placeholder:text-text-default/40 focus:outline-none focus:ring-2 focus:ring-point/40"
                placeholder="정확한 학과명을 기입하세요."
              />
              <ErrorText show={touched.department} message={errors.department} />
            </div>

            <div ref={studentNoRef}>
              <label htmlFor="studentNo" className="block text-sm font-semibold text-text-default">
                학번<span className="ml-1 text-point">*</span>
              </label>
              <input
                id="studentNo"
                value={form.studentNo}
                onChange={(e) => setField('studentNo', filterDigitsOnly(e.target.value, 8))}
                onBlur={() => touchField('studentNo')}
                inputMode="numeric"
                className="mt-3 w-full rounded-[20px] border border-border-emphasis bg-bg-section p-4 text-text-default placeholder:text-text-default/40 focus:outline-none focus:ring-2 focus:ring-point/40"
                placeholder="20261234"
              />
              <ErrorText show={touched.studentNo} message={errors.studentNo} />
            </div>

            <div ref={gradeRef}>
              <label htmlFor="grade" className="block text-sm font-semibold text-text-default">
                학년<span className="ml-1 text-point">*</span>
              </label>
              <div className="relative mt-3">
                <select
                  id="grade"
                  value={String(form.grade)}
                  onChange={(e) => setField('grade', Number(e.target.value))}
                  className="w-full appearance-none rounded-[20px] border border-border-emphasis bg-bg-section p-4 pr-12 text-text-default focus:outline-none focus:ring-2 focus:ring-point/40"
                >
                  <option value="1">1학년</option>
                  <option value="2">2학년</option>
                  <option value="3">3학년</option>
                  <option value="4">4학년</option>
                  <option value="5">휴학</option>
                  <option value="6">기타(졸업 유예 등)</option>
                </select>
                <svg
                  className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="#B3B3B3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <ErrorText show={touched.grade} message={errors.grade} />
            </div>

            <div ref={phoneRef}>
              <label htmlFor="phone" className="block text-sm font-semibold text-text-default">
                전화번호<span className="ml-1 text-point">*</span>
              </label>
              <input
                id="phone"
                value={form.phone}
                onChange={(e) => setField('phone', formatPhoneNumber(e.target.value))}
                onBlur={() => touchField('phone')}
                inputMode="tel"
                className="mt-3 w-full rounded-[20px] border border-border-emphasis bg-bg-section p-4 text-text-default placeholder:text-text-default/40 focus:outline-none focus:ring-2 focus:ring-point/40"
                placeholder="010-1234-5678"
              />
              <ErrorText show={touched.phone} message={errors.phone} />
            </div>

            <div ref={genderRef} className="flex items-center gap-6">
              <span className="shrink-0 text-sm font-semibold text-text-default">
                성별<span className="ml-1 text-point">*</span>
              </span>

              <div className="flex flex-nowrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <input
                    id="gender-male"
                    type="radio"
                    name="gender"
                    value="MALE"
                    checked={form.gender === 'MALE'}
                    onChange={() => setFieldAndTouch('gender', 'MALE')}
                    className="size-5 accent-point"
                  />
                  <label
                    htmlFor="gender-male"
                    className="text-base font-semibold text-text-default"
                  >
                    남자
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    id="gender-female"
                    type="radio"
                    name="gender"
                    value="FEMALE"
                    checked={form.gender === 'FEMALE'}
                    onChange={() => setFieldAndTouch('gender', 'FEMALE')}
                    className="size-5 accent-point"
                  />
                  <label
                    htmlFor="gender-female"
                    className="text-base font-semibold text-text-default"
                  >
                    여자
                  </label>
                </div>
              </div>
              <ErrorText show={touched.gender} message={errors.gender} />
            </div>
          </div>
        </section>

        {/* 기술 스택 */}
        <section className="mt-12">
          <FormSectionHeader title="기술 스택" />

          <div ref={codingExpRef} className="mt-6">
            <p className="text-sm font-semibold text-text-default">
              코딩 경험<span className="ml-1 text-point">*</span>
            </p>

            <div className="mt-4 space-y-4">
              {CODING_EXP_OPTIONS.map((opt) => {
                const checked = form.codingExp === opt.value;
                const isOpen = openCodingExp === opt.value;

                return (
                  <div
                    key={opt.value}
                    className={[
                      'rounded-[16px] border p-4 transition-colors',
                      checked ? 'border-point bg-bg-section' : 'border-border-emphasis bg-bg-muted',
                    ].join(' ')}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="coding-skill"
                        value={opt.value}
                        checked={checked}
                        onChange={() => setFieldAndTouch('codingExp', opt.value)}
                        className="size-5 accent-point"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setOpenCodingExp((prev) => (prev === opt.value ? null : opt.value))
                        }
                        className="flex flex-1 items-center justify-between text-left"
                      >
                        <span className="text-sm font-semibold text-text-default">{opt.label}</span>

                        <svg
                          className={[
                            'transition-transform',
                            isOpen ? 'rotate-180' : 'rotate-0',
                          ].join(' ')}
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 9L12 15L18 9"
                            stroke="#B3B3B3"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>

                    {isOpen ? (
                      <div className="mt-4 rounded-[12px] bg-bg-section p-4">
                        <CodingExpDescription description={opt.description} />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <ErrorText show={touched.codingExp} message={errors.codingExp} />

            <textarea
              value={form.techStackText}
              onChange={(e) => setField('techStackText', e.target.value)}
              className="mt-6 w-full whitespace-pre-line rounded-[20px] border border-border-emphasis bg-bg-muted p-4 text-text-default placeholder:text-text-default/40 focus:outline-none focus:ring-2 focus:ring-point/40"
              placeholder="코딩 경험에 대한 설명과 함께 보유한 기술 스택을 작성해 주세요."
              rows={4}
            />
          </div>
        </section>

        <section className="mt-8">
          <FormSectionHeader title="자기 소개" />

          <div className="mt-6 space-y-6">
            <div ref={introduceRef}>
              <label htmlFor="introduce" className="block text-sm font-semibold text-text-default">
                자기 소개 및 지원 동기<span className="ml-1 text-point">*</span>
              </label>
              <textarea
                id="introduce"
                value={form.introduce}
                onChange={(e) => setField('introduce', e.target.value)}
                onBlur={() => touchField('introduce')}
                className="mt-6 w-full rounded-[20px] border border-border-emphasis bg-bg-muted p-4 text-text-default placeholder:text-text-default/40 focus:outline-none focus:ring-2 focus:ring-point/40"
                placeholder="지원자님이 어떤 사람인지, SSCC에 지원하게 된 계기가 무엇인지 자유롭게 소개해 주세요. "
                rows={5}
              />
              <ErrorText show={touched.introduce} message={errors.introduce} />
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <div ref={wantedValueRef}>
              <label
                htmlFor="wantedValue"
                className="block text-sm font-semibold text-text-default"
              >
                SSCC를 통해 얻고 싶은 가치<span className="ml-1 text-point">*</span>
              </label>
              <textarea
                id="wantedValue"
                value={form.wantedValue}
                onChange={(e) => setField('wantedValue', e.target.value)}
                onBlur={() => touchField('wantedValue')}
                className="mt-6 w-full rounded-[20px] border border-border-emphasis bg-bg-muted p-4 text-text-default placeholder:text-text-default/40 focus:outline-none focus:ring-2 focus:ring-point/40"
                placeholder="SSCC 활동을 통해 얻고 싶은 것과 기대하는 성장 방향을 작성해주세요."
                rows={5}
              />
              <ErrorText show={touched.wantedValue} message={errors.wantedValue} />
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <div ref={aspirationRef}>
              <label htmlFor="aspiration" className="block text-sm font-semibold text-text-default">
                포부<span className="ml-1 text-point">*</span>
              </label>
              <textarea
                id="aspiration"
                value={form.aspiration}
                onChange={(e) => setField('aspiration', e.target.value)}
                onBlur={() => touchField('aspiration')}
                className="mt-6 w-full rounded-[20px] border border-border-emphasis bg-bg-muted p-4 text-text-default placeholder:text-text-default/40 focus:outline-none focus:ring-2 focus:ring-point/40"
                placeholder="SSCC에 합류하게 된다면 어떤 마음가짐으로 활동할 것인지 포부를 작성해 주세요."
                rows={5}
              />
              <ErrorText show={touched.aspiration} message={errors.aspiration} />
            </div>
          </div>
        </section>

        {/* 면접 일자 */}
        <section ref={interviewRef} className="mt-12 pb-10">
          <FormSectionHeader title="면접 일자 *" description="가능한 시간대를 선택해주세요." />

          <div className="mt-6 space-y-6">
            {INTERVIEW_OPTIONS.map((day) => (
              <InterviewDayCard
                key={day.id}
                dayId={day.id}
                label={day.label}
                slots={day.slots}
                selectedKeys={form.selectedInterviewKeys}
                onToggle={toggleSlot}
              />
            ))}
          </div>
          <ErrorText show={touched.selectedInterviewKeys} message={errors.selectedInterviewKeys} />
        </section>
      </div>
    </div>
  );
}
