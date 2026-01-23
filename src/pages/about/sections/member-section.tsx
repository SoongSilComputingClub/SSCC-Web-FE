type Member = {
  id: string;
  role: string;
  name: string;
  meta: string; // 예: "43기 컴퓨터학부"
  quote: string; // 예: "한줄로, 이야기 합니다."
};

type CardSize = 'lg' | 'md' | 'sm';

function MemberCard({ member, size }: { member: Member; size: CardSize }) {
  const isLg = size === 'lg';
  const isMd = size === 'md';

  const cardSizeClass = isLg ? 'h-[240px]' : isMd ? 'h-[180px]' : 'h-[140px]';

  const avatarSizeClass = isLg
    ? 'h-[100px] w-[100px]'
    : isMd
      ? 'h-[66px] w-[66px]'
      : 'h-[62px] w-[62px]';

  const roleTextClass = isLg ? 'text-[14px]' : isMd ? 'text-[10px]' : 'text-[10px]';
  const nameTextClass = isLg ? 'text-[22px]' : isMd ? 'text-[14px]' : 'text-[12px]';
  const metaTextClass = isLg ? 'text-[8px]' : isMd ? 'text-[6px]' : 'text-[9px]';

  const quoteClass = isLg
    ? 'mt-5 rounded-xl px-4 py-3 text-[8px]'
    : isMd
      ? 'mt-3 rounded-[10px] px-1 py-2 text-[6px]'
      : 'mt-3 rounded-lg px-3 py-2 text-[9px]';

  return (
    <div
      className={[
        'relative w-full overflow-hidden rounded-[5px]',
        'bg-bg-muted/40 shadow-[0_16px_30px_rgba(0,0,0,0.35)]',
        cardSizeClass,
      ].join(' ')}
    >
      {/* 아치형 상단 느낌(배경) */}
      <div className="absolute inset-0 rounded-t-[999px] bg-bg-muted" />

      {/* 내용 */}
      <div className="relative flex h-full flex-col items-center justify-start px-4 pt-7 text-text-default">
        {/* 프로필 원 */}
        <div
          className={[
            'rounded-full bg-bg-white',
            'shadow-[0_8px_18px_rgba(0,0,0,0.25)]',
            avatarSizeClass,
          ].join(' ')}
        />

        {/* 텍스트 */}
        <div className="mt-4 text-center leading-none">
          <div className={['font-semibold text-text-default', roleTextClass].join(' ')}>
            {member.role}{' '}
            <span className={['font-bold text-text-default', nameTextClass].join(' ')}>
              {member.name}
            </span>
          </div>
          <div className={['mt-2 text-text-default/40', metaTextClass].join(' ')}>
            {member.meta}
          </div>
        </div>

        {/* 하단 말풍선 */}
        <div
          className={[
            'mt-1.5 w-full',
            'bg-bg-white/15 text-center text-text-default/75',
            'shadow-[0_10px_18px_rgba(0,0,0,0.35)]',
            quoteClass,
          ].join(' ')}
        >
          {member.quote}
        </div>
      </div>
    </div>
  );
}

export default function MemberSection() {
  const first: Member[] = [
    {
      id: 'b1',
      role: '부회장',
      name: '000',
      meta: '43기 컴퓨터학부',
      quote: '한줄로, 이야기 합니다.',
    },
    {
      id: 'b2',
      role: '부회장',
      name: '000',
      meta: '43기 컴퓨터학부',
      quote: '한줄로, 이야기 합니다.',
    },
  ];

  const second: Member[] = [
    {
      id: 'm1',
      role: '부회장',
      name: '000',
      meta: '43기 컴퓨터학부',
      quote: '한줄로, 이야기 합니다.',
    },
    {
      id: 'm2',
      role: '부회장',
      name: '000',
      meta: '43기 컴퓨터학부',
      quote: '한줄로, 이야기 합니다.',
    },
    {
      id: 'm3',
      role: '부회장',
      name: '000',
      meta: '43기 컴퓨터학부',
      quote: '한줄로, 이야기 합니다.',
    },
  ];

  const third: Member[] = [
    {
      id: 's1',
      role: '부회장',
      name: '000',
      meta: '43기 컴퓨터학부',
      quote: '한줄로, 이야기 합니다.',
    },
    {
      id: 's2',
      role: '부회장',
      name: '000',
      meta: '43기 컴퓨터학부',
      quote: '한줄로, 이야기 합니다.',
    },
    {
      id: 's3',
      role: '부회장',
      name: '000',
      meta: '43기 컴퓨터학부',
      quote: '한줄로, 이야기 합니다.',
    },
  ];

  return (
    <section className="w-full bg-bg-default px-6 py-14">
      <div className="mx-auto w-full max-w-[420px]">
        <h2 className="text-center text-[26px] font-bold text-text-default">44기 운영진</h2>

        {/* 2개 큰 카드 */}
        <div className="mt-10 grid grid-cols-2 gap-6">
          {first.map((m) => (
            <MemberCard key={m.id} member={m} size="lg" />
          ))}
        </div>

        {/* 3개 중간 카드 */}
        <div className="mt-10 grid grid-cols-3 gap-5">
          {second.map((m) => (
            <MemberCard key={m.id} member={m} size="md" />
          ))}
        </div>

        {/* 4개 작은 카드 */}
        <div className="mt-10 grid grid-cols-3 gap-5">
          {third.map((m) => (
            <MemberCard key={m.id} member={m} size="md" />
          ))}
        </div>
      </div>
    </section>
  );
}
