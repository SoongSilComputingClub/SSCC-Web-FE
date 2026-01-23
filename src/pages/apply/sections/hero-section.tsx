import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="w-full min-h-[520px] flex items-center justify-center px-6 bg-bg-default text-text-default">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold leading-snug">
          <span className="text-point">SSCC</span>는 여러분을 기다립니다!
        </h1>

        <p className="text-xl font-bold">
          지금 바로 <span className="text-point">SSCC</span>에 지원하세요.
        </p>

        <Link
          to="/apply/form"
          className="mt-4 inline-flex item-center justify-center
                     px-8 py-4 rounded-xl bg-point text-black text-xl font-semibold
                     shadow-md hover:opacity-90 transition"
        >
          신청서 작성하기 {/* 추후 로그인 유무에 따른 조건부 렌더링 */}
        </Link>
      </div>
    </section>
  );
}
