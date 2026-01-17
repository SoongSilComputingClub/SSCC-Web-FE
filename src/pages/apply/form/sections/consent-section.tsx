export const CONSENT_CONTENT = {
  title: '개인 정보 수집 동의서',
  intro:
    '숭실대학교 중앙동아리 SSCC는 동아리 지원자 선발 및 운영을 위하여 아래와 같이 개인정보를 수집·이용하고자 합니다. 내용을 충분히 읽어보신 후 동의 여부를 선택해 주시기 바랍니다.',
  purposesTitle: '수집 및 이용 목적',
  purposes: ['SSCC 신입 부원 선발 및 지원자 관리', '합격 여부 안내 및 동아리 운영 관련 연락'],
  retentionTitle: '보유 및 이용 기간',
  retention: '동아리 선발 절차 종료 후 1년 이내 (단, 합격자의 경우 동아리 활동 기간 동안 보관)',
  rightsTitle: '동의 거부 권리 및 불이익 안내',
  rights:
    '개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으나, 동의하지 않을 경우 SSCC 지원이 제한될 수 있습니다.',
} as const;

export default function ConsentSection() {
  return (
    <div className="w-full max-w-[560px] mx-auto flex flex-col gap-4 px-4 bg-bg-default">
      {/* Title */}
      <div className="rounded-[20px] bg-bg-section px-5 py-6">
        <h2 className="text-point text-xl font-bold text-center">{CONSENT_CONTENT.title}</h2>

        {/* 세부 내용 */}
        <div className="mt-4 w-full rounded-[20px] bg-bg-muted px-5 py-4">
          <div className="text-sm text-text-default/90 leading-relaxed">
            <p>{CONSENT_CONTENT.intro}</p>

            <div className="mt-4">
              <p className="font-semibold text-text-default">■ {CONSENT_CONTENT.purposesTitle}</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                {CONSENT_CONTENT.purposes.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <p className="font-semibold text-text-default">■ {CONSENT_CONTENT.retentionTitle}</p>
              <p className="mt-2">{CONSENT_CONTENT.retention}</p>
            </div>

            <div className="mt-4">
              <p className="font-semibold text-text-default">■ {CONSENT_CONTENT.rightsTitle}</p>
              <p className="mt-2">{CONSENT_CONTENT.rights}</p>
            </div>
          </div>
        </div>

        {/* 체크박스 */}
        <label className="mt-4 flex items-center gap-2 text-xs text-text-default/80">
          <input
            type="checkbox"
            className="h-4 w-4 accent-point cursor-pointer"
          />
          개인정보 수집 및 이용에 동의합니다. (필수)
        </label>
      </div>
    </div>
  );
}
