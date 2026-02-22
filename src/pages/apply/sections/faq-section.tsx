import { useState } from 'react';

import SectionHeader from '../components/section-header';

const FAQS = [
  {
    q: '휴학생도 활동 가능한가요?',
    a: '네, 휴학생도 지원 및 활동이 가능합니다. 활동 일정에 성실히 참여할 수 있다면 학적과 무관하게 지원할 수 있습니다.',
  },
  {
    q: 'SSCC 활동 기간은 얼마나 되나요?',
    a: '기본 활동 기간은 1학기(6개월)이며, 이후에도 본인의 의사에 따라 계속해서 활동을 이어나가실 수 있습니다.',
  },
  {
    q: '개발 경험이 없어도 괜찮나요?',
    a: '물론입니다! 현재의 개발 실력 보다는 함께 학습하고 성장하고자 하는 열정과 활동 의지를 더욱 중요하게 평가합니다.',
  },
  {
    q: 'IT 관련 전공생만 지원 가능한가요?',
    a: '아닙니다. 전공과 무관하게 프로그래밍과 IT 기술에 관심이 있는 학생이라면 누구나 환영합니다.',
  },
  {
    q: '면접은 어떤 방식으로 진행되나요?',
    a: '면접은 대면으로 진행됩니다. 제출해주신 지원서를 바탕으로 지원 동기, 활동 의지, 협업 태도 등을 중심으로 진행될 예정입니다.',
  },
  {
    q: '회비는 얼마인가요?',
    a: '회비는 학기당 35,000원입니다.',
  },
  {
    q: '기타 문의사항이 있을 경우 어디로 연락하면 되나요?',
    a: (
      <>
        SSCC 카카오톡 채널로 문의해주세요!
        <br />
        <a
          href="https://open.kakao.com/o/spMLQKai"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block text-point font-medium transition-colors underline hover:text-point/80"
        >
          SSCC 오픈채팅 이동하기
        </a>
      </>
    ),
  },
] as const;

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="flex w-full justify-center bg-bg-default px-6 py-16">
      <div className="flex w-full max-w-5xl flex-col items-center gap-12">
        <SectionHeader label="F&Q" title="자주 들어오는 질문" />

        <div className="flex w-full flex-col gap-4">
          {FAQS.map((item, idx) => {
            const open = openIdx === idx;
            return (
              <div key={item.q} className="w-full rounded-2xl bg-bg-muted px-6 py-5">
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  {/* Question */}
                  <div className="flex items-center gap-2">
                    <span className="text-point">Q.</span>
                    <span className="text-base font-medium text-text-default">{item.q}</span>
                  </div>

                  {/* 펼침/접힘 아이콘 */}
                  <svg
                    className={`size-5 text-border-emphasis transition-transform ${
                      open ? 'rotate-180' : ''
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    open ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div
                    className={`overflow-hidden ${
                      open ? 'border-t border-border-default pt-4' : ''
                    }`}
                  >
                    <p className="text-sm leading-relaxed text-text-default">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
