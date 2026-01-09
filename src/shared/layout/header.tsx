import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="w-full bg-black text-white px-6 py-3">
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center justify-between gap-8">
          {/*Logo*/}
          <div className="shrink-0">
            <img src="/logo2.svg" alt="SSCC Logo" className="h-8 w-auto" />
          </div>

          {/*Menu*/}
          <NavLink to="/" className="text-[11px] font-semibold text-gray-300 shrink-0">
            메인
          </NavLink>
          <NavLink to="/about" className="text-[11px] font-semibold text-gray-300 shrink-0">
            소개
          </NavLink>
          <NavLink to="/projects" className="text-[11px] font-semibold text-gray-300 shrink-0">
            프로젝트
          </NavLink>

          {/*Apply*/}
          <NavLink
            to="/apply"
            className="shrink-0 rounded-full border border-teal-300/80 px-[12px] py-2 text-[11px] font-semibold text-teal-200 hover:bg-teal-300/10"
          >
            지원하기
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
