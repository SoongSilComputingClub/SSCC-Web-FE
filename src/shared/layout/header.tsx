export function Header() {
  return (
    <header className="w-full bg-black text-white px-6 py-3">
      <div className="mx-auto flex max-w-7xl w-full justify-between items-center">
        {/* Left: logo*/}
        <div className="w-12 h-8 overflow-hidden">
          <img
            src="/logo.svg"
            alt="SSCC Logo"
            className="h-8 w-15 max-w-none object-none translate-x-0"
          />
        </div>

        {/* Center: menu*/}
        {/* 추후 링크 연결*/}
        <nav className="flex items-center gap-11 text-[11px] font-semibold text-gray-300">
          <a>메인</a>
          <a>소개</a>
          <a>프로젝트</a>
        </nav>

        {/* Right: apply*/}
        <a className="rounded-full border border-teal-300/80 px-[12px] py-2 text-[11px] font-semibold text-teal-200 hover:bg-teal-300/10">
          지원하기
        </a>
      </div>
    </header>
  );
}
