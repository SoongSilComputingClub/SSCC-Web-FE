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

type MemberCardProps = Readonly<{
  member: Member;
  size: CardSize;
}>;

const MEMBER_CARD_STYLE: Record<
  CardSize,
  {
    cardWidthClass: string;
    cardSizeClass: string;
    avatarSizeClass: string;
    roleTextClass: string;
    nameTextClass: string;
    metaTextClass: string;
    quoteClass: string;
  }
> = {
  lg: {
    cardWidthClass: 'max-w-none',
    cardSizeClass: 'h-[250px] sm:h-[350px]',
    avatarSizeClass: 'h-[105px] w-[105px] sm:h-[170px] sm:w-[170px]',
    roleTextClass: 'text-sm sm:text-md',
    nameTextClass: 'text-lg sm:text-2xl',
    metaTextClass: 'text-xs sm:text-sm',
    quoteClass: 'mt-2 mb-3 rounded-xl py-2 text-xs sm:text-sm',
  },
  md: {
    cardWidthClass: 'max-w-[130px] sm:max-w-[170px]',
    cardSizeClass: 'h-[200px] sm:h-[250px]',
    avatarSizeClass: 'h-[66px] w-[66px] sm:h-[110px] sm:w-[110px]',
    roleTextClass: 'text-2xs sm:text-sm',
    nameTextClass: 'text-sm sm:text-lg',
    metaTextClass: 'text-2xs sm:text-xs',
    quoteClass: 'mt-2 mb-3 rounded-[10px] py-2 text-2xs sm:text-xs',
  },
  sm: {
    cardWidthClass: 'max-w-[120px]',
    cardSizeClass: 'h-[150px] sm:h-[200px]',
    avatarSizeClass: 'h-[45px] w-[45px] sm:h-[75px] sm:w-[75px]',
    roleTextClass: 'text-[6px] sm:text-xs',
    nameTextClass: 'text-[12px] sm:text-sm',
    metaTextClass: 'text-[6px] sm:text-xs',
    quoteClass: 'mt-1 mb-1 rounded-lg py-1 text-[6px] sm:text-xs',
  },
};

function MemberCard({ member, size }: MemberCardProps) {
  const styles = MEMBER_CARD_STYLE[size];

  const containerClassName = [
    'relative w-full overflow-hidden rounded-[5px]',
    styles.cardSizeClass,
    styles.cardWidthClass,
    'mx-auto',
  ].join(' ');

  const avatarWrapperClassName = [
    'overflow-hidden rounded-full bg-bg-white/40',
    'shadow-[0_8px_18px_rgba(0,0,0,0.25)]',
    styles.avatarSizeClass,
  ].join(' ');

  const roleClassName = ['font-semibold text-text-default', styles.roleTextClass].join(' ');
  const nameClassName = ['font-bold text-text-default', styles.nameTextClass].join(' ');
  const metaClassName = ['mt-2 text-text-default/40', styles.metaTextClass].join(' ');

  const quoteClassName = [
    'mt-1.5 w-full',
    'bg-bg-white/15 text-center text-text-default/75',
    'shadow-[0_10px_18px_rgba(0,0,0,0.35)]',
    styles.quoteClass,
  ].join(' ');

  return (
    <div className={containerClassName}>
      {/* 아치형 상단 느낌(배경) */}
      <div className="absolute inset-0 rounded-t-[999px] bg-bg-muted" />

      {/* 내용 */}
      <div className="relative flex h-full flex-col items-center justify-start px-3 pt-7 text-text-default">
        {/* 프로필 원 */}
        <div className={avatarWrapperClassName}>
          {member.avatarSrc ? (
            <img
              src={member.avatarSrc}
              alt={`${member.name} 프로필 사진`}
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full" />
          )}
        </div>

        {/* 텍스트 */}
        <div className="mt-2 whitespace-nowrap text-center leading-none">
          <div className={roleClassName}>
            {member.role} <span className={nameClassName}>{member.name}</span>
          </div>

          <div className={metaClassName}>{member.meta}</div>
        </div>

        {/* 하단 말풍선 */}
        <div className={quoteClassName}>{member.quote}</div>
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
      <div className="mx-auto w-full max-w-[420px] sm:max-w-[550px]">
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

        {/* 4개 작은 카드 */}
        <div className="mt-10 grid grid-cols-4 gap-1">
          {third.map((m) => (
            <MemberCard key={m.id} member={m} size="sm" />
          ))}
        </div>
      </div>
    </section>
  );
}
