import logoImg from '@/assets/images/about/logo-image.png';

export default function BannerSection() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-bg-default">
      <div className="aspect-square w-[85%] max-w-[500px] overflow-hidden rounded-2xl bg-bg-default shadow-lg">
        <div className="relative h-[100%] bg-gradient-to-b from-point via-[#319AAD] to-[#006E93] text-center text-text-default">
          <div className="flex flex-col items-center justify-center pt-[35%]">
            <div className="h-20 w-20 translate-x-[12%] overflow-hidden">
              <img
                src={logoImg}
                draggable={false}
                alt="SSCC 로고"
                className="h-full w-full translate-y-[8%] scale-[1.8] select-none object-contain"
              />
            </div>

            <div className="mb-4 text-xl font-bold italic leading-none">SSCC</div>
            <div className="mb-6 translate-y-[-70%] text-sm font-light">SSCC 44th</div>
          </div>
        </div>
      </div>
    </section>
  );
}
