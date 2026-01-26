import logoImg from '@/assets/images/about/logo-image.png';

export default function BannerSection() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-bg-default">
      <div className="aspect-square w-[85%] overflow-hidden rounded-2xl bg-bg-default shadow-lg">
        <div className="relative flex h-96 flex-col items-center justify-center bg-gradient-to-b from-point via-[#319AAD] to-[#006E93] text-center text-text-default">
          <img
            src={logoImg}
            className="max-h-[35%] max-w-[35%] translate-x-[7%] select-none object-contain leading-none"
            draggable={false}
          />
          <div className="translate-y-[-40%]">
            <div className="mb-4 text-[27px] font-bold italic leading-none">SSCC</div>
            <div className="mb-6 translate-y-[-55%] text-[15px] font-light">SSCC 44th</div>
          </div>
        </div>
      </div>
    </section>
  );
}
