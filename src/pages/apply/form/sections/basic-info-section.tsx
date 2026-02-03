import { useMemo, useState } from 'react';

import FormSectionHeader from '../components/form-section-header';
import InterviewDayCard from '../components/interview-day-card';

export default function BasicInfo() {
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
  const [studentId, setStudentId] = useState('');
  const [grade, setGrade] = useState('1');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [intro, setIntro] = useState('');

  const [codingSkill, setCodingSkill] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [techStack, setTechStack] = useState('');
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const interviewOptions = useMemo(
    () => [
      {
        id: '2026-03-05',
        label: '03월 05일 화요일',
        slots: [
          '10:00 - 11:00',
          '11:00 - 12:00',
          '12:00 - 13:00',
          '13:00 - 14:00',
          '14:00 - 15:00',
          '15:00 - 16:00',
          '16:00 - 17:00',
          '17:00 - 18:00',
          '18:00 - 19:00',
          '19:00 - 20:00',
        ],
      },
      {
        id: '2026-03-06',
        label: '03월 06일 수요일',
        slots: [
          '10:00 - 11:00',
          '11:00 - 12:00',
          '12:00 - 13:00',
          '13:00 - 14:00',
          '14:00 - 15:00',
          '15:00 - 16:00',
          '16:00 - 17:00',
          '17:00 - 18:00',
          '18:00 - 19:00',
          '19:00 - 20:00',
        ],
      },
    ],
    [],
  );

  const toggleSlot = (key: string) => {
    setSelectedSlots((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-col gap-4 bg-bg-default px-4">
      <div className="rounded-[20px] bg-bg-muted px-5">
        {/* 기본 정보 */}
        <section className="mt-8">
          <FormSectionHeader title="기본 정보" />

          <div className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-text-default">이름</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-3 w-full rounded-[20px] border border-border-emphasis bg-bg-section p-4 text-text-default placeholder:text-text-default/40 focus:outline-none focus:ring-2 focus:ring-point/40"
                placeholder="이름을 기입하세요."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-default">학과</label>
              <input
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="mt-3 w-full rounded-[20px] border border-border-emphasis bg-bg-section p-4 text-text-default placeholder:text-text-default/40 focus:outline-none focus:ring-2 focus:ring-point/40"
                placeholder="정확한 학과명을 기입하세요."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-default">학번</label>
              <input
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                inputMode="numeric"
                className="mt-3 w-full rounded-[20px] border border-border-emphasis bg-bg-section p-4 text-text-default placeholder:text-text-default/40 focus:outline-none focus:ring-2 focus:ring-point/40"
                placeholder="20261234"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-default">학년</label>
              <div className="relative mt-3">
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full appearance-none rounded-[20px] border border-border-emphasis bg-bg-section p-4 pr-12 text-text-default focus:outline-none focus:ring-2 focus:ring-point/40"
                >
                  <option value="1">1학년</option>
                  <option value="2">2학년</option>
                  <option value="3">3학년</option>
                  <option value="4">4학년</option>
                  <option value="5">5학년 이상</option>
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
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-default">전화번호</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="tel"
                className="mt-3 w-full rounded-[20px] border border-border-emphasis bg-bg-section p-4 text-text-default placeholder:text-text-default/40 focus:outline-none focus:ring-2 focus:ring-point/40"
                placeholder="010-1234-5678"
              />
            </div>

            <div className="flex items-center gap-6">
              <span className="shrink-0 text-sm font-semibold text-text-default">성별</span>

              <div className="flex flex-nowrap items-center gap-6">
                <label className="flex items-center gap-3 text-base font-semibold text-text-default">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={() => setGender('male')}
                    className="size-5 accent-point"
                  />
                  남자
                </label>
                <label className="flex items-center gap-3 text-base font-semibold text-text-default">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={() => setGender('female')}
                    className="size-5 accent-point"
                  />
                  여자
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* 자기소개 */}
        <section className="mt-12">
          <FormSectionHeader title="자기소개" />

          <textarea
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            className="mt-6 w-full rounded-[20px] border border-border-emphasis bg-bg-muted p-4 text-text-default placeholder:text-text-default/40 focus:outline-none focus:ring-2 focus:ring-point/40"
            placeholder="SSCC에 지원하게 된 이유와 간단한 자기소개를 작성해주세요."
            rows={5}
          />
        </section>

        {/* 기술 스택 */}
        <section className="mt-12">
          <FormSectionHeader title="기술 스택" />

          <div className="mt-6">
            <div className="flex items-center gap-6">
              <p className="text-sm font-semibold text-text-default">코딩 실력</p>

              <div className="flex items-center gap-6">
                {(
                  [
                    { label: '최하', value: 1 },
                    { label: '하', value: 2 },
                    { label: '중', value: 3 },
                    { label: '상', value: 4 },
                    { label: '최상', value: 5 },
                  ] as const
                ).map((opt) => {
                  const checked = codingSkill === opt.value;
                  return (
                    <label
                      key={opt.value}
                      className="flex cursor-pointer select-none flex-col items-center gap-2"
                    >
                      <input
                        type="radio"
                        name="coding-skill"
                        value={opt.value}
                        checked={checked}
                        onChange={() => setCodingSkill(opt.value)}
                        className="sr-only"
                      />
                      <span
                        className={[
                          'flex h-6 w-6 items-center justify-center rounded-full border',
                          checked ? 'border-point' : 'border-border-emphasis',
                        ].join(' ')}
                      >
                        {checked ? <span className="size-3 rounded-full bg-point" /> : null}
                      </span>
                      <span className="text-sm font-semibold text-text-default/70">
                        {opt.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <textarea
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="mt-6 w-full whitespace-pre-line rounded-[20px] border border-border-emphasis bg-bg-muted p-4 text-text-default placeholder:text-text-default/40 focus:outline-none focus:ring-2 focus:ring-point/40"
              placeholder="보유한 기술 스택을 써주세요. (예 : HTML, CSS, Python...)"
              rows={4}
            />
          </div>
        </section>

        {/* 면접 일자 */}
        <section className="mt-12 pb-10">
          <FormSectionHeader title="면접 일자" description="가능한 시간대를 선택해주세요." />

          <div className="mt-6 space-y-6">
            {interviewOptions.map((day) => (
              <InterviewDayCard
                key={day.id}
                dayId={day.id}
                label={day.label}
                slots={day.slots}
                selectedKeys={selectedSlots}
                onToggle={toggleSlot}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
