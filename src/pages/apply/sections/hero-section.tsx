import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="flex min-h-[520px] w-full items-center justify-center bg-bg-default px-6 text-text-default">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold leading-snug">
          <span className="text-point">SSCC</span>는 여러분을 기다립니다!
        </h1>

        <p className="text-xl font-bold">
          지금 바로 <span className="text-point">SSCC</span>에 지원하세요.
        </p>

        <Link
          to="/apply/form"
          className="item-center mt-4 inline-flex justify-center rounded-xl bg-point px-8 py-4 text-xl font-semibold text-black shadow-md transition hover:opacity-90"
        >
          신청서 작성하기 {/* 추후 로그인 유무에 따른 조건부 렌더링 */}
        </Link>
      </div>
    </section>
  );
}
