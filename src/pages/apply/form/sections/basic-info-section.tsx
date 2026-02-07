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
  const [form, setForm] = useState({
    intro: '',
    wantedValue: '',
    aspiration: '',
  });

  const [codingSkill, setCodingExp] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [openCodingExp, setOpenCodingExp] = useState<number | null>(null);
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

        {/* 기술 스택 */}
        <section className="mt-12">
          <FormSectionHeader title="기술 스택" />

          <div className="mt-6">
            <p className="text-sm font-semibold text-text-default">코딩 경험</p>

            <div className="mt-4 space-y-4">
              {(
                [
                  {
                    label: 'A. 완전 처음이다.',
                    value: 1,
                    description:
                      '프로그래밍을 처음 접하거나, 아직 어떤 언어도 배워본 적이 없는 상태입니다. 동아리에서 처음부터 차근차근 배워나가고 싶습니다.',
                  },
                  {
                    label: 'B. 학교 교과 과정만 따라갔다.',
                    value: 2,
                    description:
                      '학교 수업(C언어, Python 등)에서 배운 내용을 이해하고 과제를 해결한 경험이 있습니다. 수업 외에는 따로 공부하거나 프로젝트를 해본 적은 없습니다.',
                  },
                  {
                    label: 'C. 학교 교과목, 동아리에서 배운 내용을 활용해봤다.',
                    value: 3,
                    description:
                      '학교나 동아리에서 배운 내용을 바탕으로 간단한 프로그램이나 웹 페이지를 만들어본 경험이 있습니다. 기본적인 문법과 개념을 이해하고 있으며, 배운 내용을 응용할 수 있습니다.',
                  },
                  {
                    label: 'D. 토이 프로젝트를 진행해봤다.',
                    value: 4,
                    description:
                      '개인적으로 아이디어를 내어 작은 프로젝트(웹사이트, 앱, 게임 등)를 기획하고 개발해본 경험이 있습니다. GitHub에 코드를 올리거나 친구들에게 보여준 경험이 있습니다.',
                  },
                  {
                    label: 'E. 개발 관련 공모전 및 대회에 참여해봤다.',
                    value: 5,
                    description:
                      '해커톤, 프로그래밍 경진대회, 창업 공모전 등에 참여하여 팀 프로젝트를 진행한 경험이 있습니다. 실제 사용자를 위한 서비스를 개발하고 일정 내에 결과물을 완성한 경험이 있습니다.',
                  },
                ] as const
              ).map((opt) => {
                const checked = codingSkill === opt.value;
                const isOpen = openCodingExp === opt.value;

                return (
                  <div
                    key={opt.value}
                    className={[
                      'rounded-[16px] border p-4 transition-colors',
                      checked
                        ? 'border-point bg-bg-section'
                        : 'border-border-emphasis bg-bg-muted',
                    ].join(' ')}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="coding-skill"
                        value={opt.value}
                        checked={checked}
                        onChange={() => setCodingExp(opt.value)}
                        className="size-5 accent-point"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setOpenCodingExp((prev) =>
                            prev === opt.value ? null : opt.value,
                          )
                        }
                        className="flex flex-1 items-center justify-between text-left"
                      >
                        <span className="text-sm font-semibold text-text-default">
                          {opt.label}
                        </span>

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
                      <div className="mt-4 rounded-[12px] bg-bg-section p-4 text-sm text-text-default/80">
                        {opt.description}
                      </div>
                    ) : null}
                  </div>
                );
              })}
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

      <section className="mt-8">
          <FormSectionHeader title="자기 소개" />

          <div className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-text-default">자기 소개</label>
              <textarea
                value={form.intro}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, intro: e.target.value }))
                }
                className="mt-6 w-full rounded-[20px] border border-border-emphasis bg-bg-muted p-4 text-text-default placeholder:text-text-default/40 focus:outline-none focus:ring-2 focus:ring-point/40"
                placeholder="지원자님이 어떤 사람인지 자유롭게 소개해주세요."
                rows={5}
              />
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-text-default">SSCC를 통해 얻고 싶은 가치</label>
              <textarea
                value={form.wantedValue}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, wantedValue: e.target.value }))
                }
                className="mt-6 w-full rounded-[20px] border border-border-emphasis bg-bg-muted p-4 text-text-default placeholder:text-text-default/40 focus:outline-none focus:ring-2 focus:ring-point/40"
                placeholder="SSCC 활동을 통해 얻고 싶은 것과 기대하는 성장 방향을 작성해주세요."
                rows={5}
              />
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-text-default">포부</label>
              <textarea
                value={form.aspiration}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, aspiration: e.target.value }))
                }
                className="mt-6 w-full rounded-[20px] border border-border-emphasis bg-bg-muted p-4 text-text-default placeholder:text-text-default/40 focus:outline-none focus:ring-2 focus:ring-point/40"
                placeholder="SSCC에 합류하게 된다면 어떤 활동과 기여를 하고 싶은지 포부를 작성해주세요."
                rows={5}
              />
            </div>
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
