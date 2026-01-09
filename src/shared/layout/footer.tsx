export function Footer() {
  return (
    <footer className="w-full bg-black text-white px-6 py-10">
      <div className="mx-auto max-w-7xl w-full flex flex-col gap-8 md:flex-row md:justify-between">
        {/* Left */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            {/* logo */}
            <img src="/logo.svg" alt="SSCC Logo" className="h-8 w-auto" />
          </div>

          <p className="text-sm text-gray-300 leading-relaxed">
            서울특별시 동작구 상도로 369
            <br />
            숭실대학교 학생회관 233호
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-4 mt-8 self-end items-end text-right md:mt-0 md:self-auto md:ml-auto">
          <span className="text-sm text-gray-300">SSCC의 SNS 바로가기</span>

          <div className="flex gap-4">
            <a href="https://www.instagram.com/sscc_ssu/" target="_blank" rel="noopener noreferrer">
              <img src="/icons/instagram.svg" alt="Instagram" className="h-8 w-8" />
            </a>

            <a
              href="https://github.com/SoongSilComputingClub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/icons/github.svg" alt="GitHub" className="h-8 w-8" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
