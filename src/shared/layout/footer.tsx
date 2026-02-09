export function Footer() {
  return (
    <footer className="bg-default text-default w-full px-6 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 md:flex-row md:justify-between">
        {/* Left */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            {/* logo */}
            <img src="/logo.svg" alt="SSCC Logo" className="h-8 w-auto" />
          </div>

          <div>
            <p className="text-sm leading-relaxed text-gray-300">숭실대학교 학생회관 233호</p>
            <p className="text-sm leading-relaxed text-text-placeholder">
              © 2026 SSCC. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="mt-8 flex flex-col items-end gap-2 self-end text-right md:ml-auto md:mt-0 md:self-auto">
          <span className="text-sm text-gray-300">SSCC의 SNS 바로가기</span>

          <div className="flex gap-4">
            <a href="https://www.instagram.com/sscc_ssu/" target="_blank" rel="noopener noreferrer">
              <img src="/icons/instagram.svg" alt="Instagram" className="size-8" />
            </a>

            <a
              href="https://github.com/SoongSilComputingClub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/icons/github.svg" alt="GitHub" className="size-8" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
