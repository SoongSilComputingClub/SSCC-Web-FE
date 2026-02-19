import imgSrc from '@/assets/images/about/logo-image.png';

type Member = {
  id: string;
  role: string;
  name: string;
  meta: string; // 예: "43기 컴퓨터학부"
  quote: string; // 예: "한줄로, 이야기 합니다."
  avatarSrc?: string;
};

type CardSize = 'lg' | 'md' | 'sm';

function MemberCard({ member, size }: { member: Member; size: CardSize }) {
  const isLg = size === 'lg';
  const isMd = size === 'md';

  const cardWidthClass = isLg
    ? 'max-w-none' // lg는 꽉 차도 괜찮다면
    : isMd
      ? 'max-w-[130px]' // md는 폭이 너무 커지지 않게
      : 'max-w-[120px]'; // sm도 동일하게 제한

  const cardSizeClass = isLg ? 'h-[250px]' : isMd ? 'h-[200px]' : 'h-[150px]';

  const avatarSizeClass = isLg
    ? 'h-[105px] w-[105px]'
    : isMd
      ? 'h-[66px] w-[66px]'
      : 'h-[45px] w-[45px]';

  const roleTextClass = isLg ? 'text-sm' : isMd ? 'text-2xs' : 'text-[6px]';
  const nameTextClass = isLg ? 'text-lg' : isMd ? 'text-sm' : 'text-[12px]';
  const metaTextClass = isLg ? 'text-xs' : isMd ? 'text-2xs' : 'text-[6px]';

  const quoteClass = isLg
    ? 'mt-2 mb-3 rounded-xl py-2 text-xs'
    : isMd
      ? 'mt-2 mb-3 rounded-[10px] py-2 text-2xs'
      : 'mt-1 mb-1 rounded-lg py-1 text-[6px]';

  return (
    <div
      className={[
        'relative w-full overflow-hidden rounded-[5px]',
        cardSizeClass,
        cardWidthClass,
        'mx-auto',
      ].join(' ')}
    >
      {/* 아치형 상단 느낌(배경) */}
      <div className="absolute inset-0 rounded-t-[999px] bg-bg-muted" />

      {/* 내용 */}
      <div className="relative flex h-full flex-col items-center justify-start px-3 pt-7 text-text-default">
        {/* 프로필 원 */}
        <div
          className={[
            'overflow-hidden rounded-full bg-bg-white/40',
            'shadow-[0_8px_18px_rgba(0,0,0,0.25)]',
            avatarSizeClass,
          ].join(' ')}
        >
          {member.avatarSrc ? (
            <img
              src={member.avatarSrc}
              alt={`${member.name} 프로필 사진`}
              className="h-full w-full object-cover object-center" // ✅ 꽉 채우고 비율 유지
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full" />
          )}
        </div>
        {/* 텍스트 */}
        <div className="mt-2 whitespace-nowrap text-center leading-none">
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
      role: '회장',
      name: '이민우',
      meta: 'SSCC 40기',
      quote: 'AI융합학부 22학번',
      avatarSrc: imgSrc,
    },
    {
      id: 'b2',
      role: '부회장',
      name: '최나영',
      meta: 'SSCC 43기',
      quote: '정보보호학과 24학번',
      avatarSrc: imgSrc,
    },
  ];

  const second: Member[] = [
    {
      id: 'm1',
      role: '행정국장',
      name: '원영진',
      meta: 'SSCC 40기',
      quote: 'AI융합학부 22학번',
      avatarSrc: imgSrc,
    },
    {
      id: 'm2',
      role: '학술국장',
      name: '최지우',
      meta: 'SSCC 43기',
      quote: 'AI융합학부 24학번',
      avatarSrc: imgSrc,
    },
    {
      id: 'm3',
      role: '홍보국장',
      name: '임채은',
      meta: 'SSCC 43기',
      quote: 'AI융합학부 24학번',
      avatarSrc: imgSrc,
    },
  ];

  const third: Member[] = [
    {
      id: 's1',
      role: '행정국원',
      name: '최재웅',
      meta: 'SSCC 44기',
      quote: '정보보호학과 24학번',
      avatarSrc: imgSrc,
    },
    {
      id: 's2',
      role: '행정국원',
      name: '김예현',
      meta: 'SSCC 43기',
      quote: '컴퓨터학부 24학번',
      avatarSrc: imgSrc,
    },
    {
      id: 's3',
      role: '학술국원',
      name: '정현민',
      meta: 'SSCC 43기',
      quote: '컴퓨터학부 22학번',
      avatarSrc: imgSrc,
    },
    {
      id: 's4',
      role: '홍보국원',
      name: '권나현',
      meta: 'SSCC 41기',
      quote: 'AI융합학부 23학번',
      avatarSrc: imgSrc,
    },
  ];
  return (
    <section className="w-full bg-bg-default px-6 py-14">
      <div className="mx-auto w-full max-w-[420px]">
        <h2 className="text-center text-xl font-bold text-text-default">44기 운영진</h2>

        {/* 2개 큰 카드 */}
        <div className="mt-10 grid grid-cols-2 gap-6">
          {first.map((m) => (
            <MemberCard key={m.id} member={m} size="lg" />
          ))}
        </div>

        {/* 3개 중간 카드 */}
        <div className="mt-10 grid grid-cols-3 gap-2">
          {second.map((m) => (
            <MemberCard key={m.id} member={m} size="md" />
          ))}
        </div>

        {/* 4개 중간 카드 */}
        <div className="mt-10 grid grid-cols-4 gap-1">
          {third.map((m) => (
            <MemberCard key={m.id} member={m} size="sm" />
          ))}
        </div>
      </div>
    </section>
  );
}
