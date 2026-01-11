import { useState } from "react"
import SectionHeader from "../components/section-header";

const FAQS = [
  {
    q: "휴학생도 활동 가능한가요?",
    a: "네, 휴학생도 지원 및 활동이 가능합니다. 활동 일정에 성실히 참여할 수 있다면 학적과 무관하게 지원할 수 있습니다.",
  },
  {
    q: "개발 경험이 없어도 괜찮나요?",
    a: "물론입니다. 기초부터 함께 학습하며 성장하는 것을 목표로 하고 있어 초보자도 환영합니다.",
  },
  {
    q: "면접은 어떤 방식으로 진행되나요?",
    a: "면접은 대면으로 진행되며, 지원 동기와 활동 의지를 중심으로 간단한 대화를 나눕니다.",
  },
] as const

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section className="w-full bg-bg-default px-6 py-16 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col items-center gap-12">
        <SectionHeader label="F&Q" title="자주 들어오는 질문" />

        <div className="w-full flex flex-col gap-4">
          {FAQS.map((item, idx) => {
            const open = openIdx === idx
            return (
              <div
                key={item.q}
                className="w-full rounded-2xl bg-bg-muted px-6 py-5"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 text-left"
                >
                  {/* Question */}
                  <div className="flex items-center gap-2">
                    <span className="text-point">Q.</span>
                    <span className="text-base text-text-default">
                      {item.q}
                    </span>
                  </div>

                  {/* */}
                  <svg
                    className={`w-5 h-5 text-[#B3B3B3] transition-transform ${
                      open ? "rotate-180" : ""
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
                    open ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-text-default leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}