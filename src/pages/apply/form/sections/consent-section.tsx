import { useState } from 'react';

export const CONSENT_CONTENT = {
  title: '개인 정보 수집 동의서',
  intro:
    '숭실대학교 중앙동아리 SSCC는 동아리 지원자 선발 및 운영을 위하여 아래와 같이 개인정보를 수집·이용하고자 합니다. 내용을 충분히 읽어보신 후 동의 여부를 선택해 주시기 바랍니다.',
  purposesTitle: '수집 및 이용 목적',
  purposes: ['SSCC 신입 부원 선발 및 지원자 관리', '합격 여부 안내 및 동아리 운영 관련 연락'],
  itemsTitle: '수집하는 개인정보 항목',
  items: ['필수항목: 성명, 학과, 학번, 학년, 전화번호, 성별'],
  retentionTitle: '보유 및 이용 기간',
  retention: ['동아리 선발 절차 종료 후 1년 이내\n(단, 합격자의 경우 동아리 활동 기간 동안 보관)'],
  rightsTitle: '동의 거부 권리 및 불이익 안내',
  rights:
    '개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으나, 동의하지 않을 경우 SSCC 지원 및 선발이 제한될 수 있습니다.',
} as const;

const CONSENT_SECTIONS = [
  {
    title: CONSENT_CONTENT.purposesTitle,
    type: 'list',
    content: CONSENT_CONTENT.purposes,
  },
  {
    title: CONSENT_CONTENT.itemsTitle,
    type: 'list',
    content: CONSENT_CONTENT.items,
  },
  {
    title: CONSENT_CONTENT.retentionTitle,
    type: 'list',
    content: CONSENT_CONTENT.retention,
  },
  {
    title: CONSENT_CONTENT.rightsTitle,
    type: 'text',
    content: CONSENT_CONTENT.rights,
  },
] as const;

export default function ConsentSection({
  onConsentChange,
}: {
  onConsentChange?: (agreed: boolean) => void;
}) {
  const [agreed, setAgreed] = useState(false);

  const handleChange = (checked: boolean) => {
    setAgreed(checked);
    onConsentChange?.(checked);
  };

  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-col gap-4 bg-bg-default px-4">
      {/* 타이틀 */}
      <div className="rounded-[20px] bg-bg-section px-5 py-6">
        <h2 className="text-center text-lg font-bold text-point">{CONSENT_CONTENT.title}</h2>

        {/* 세부 내용 */}
        <div className="mt-4 w-full rounded-[20px] bg-bg-muted px-4 py-4">
          <div className="my-2 text-sm leading-relaxed text-text-default/90">
            <p>{CONSENT_CONTENT.intro}</p>

            {CONSENT_SECTIONS.map((section) => (
              <div key={section.title} className="mt-4">
                <p className="font-semibold text-text-default">▫ {section.title}</p>

                {section.type === 'list' ? (
                  <ul className="list-disc space-y-1 whitespace-pre-line pl-5">
                    {section.content.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="whitespace-pre-line">{section.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 체크박스 */}
        <label className="mt-4 flex items-center gap-2 text-sm text-text-default/80">
          <input
            type="checkbox"
            checked={agreed}
            required
            onChange={(e) => handleChange(e.target.checked)}
            className="size-4 cursor-pointer accent-point"
          />
          개인정보 수집 및 이용에 동의합니다. (필수)
        </label>
      </div>
    </div>
  );
}
