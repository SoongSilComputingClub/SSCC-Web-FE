import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="w-full bg-bg-default px-6 py-3 text-text-default">
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center justify-between">
          {/*Logo*/}
          <NavLink to="/" className="shrink-0">
            <img src="/logo2.svg" alt="SSCC Logo" className="h-8 w-auto" />
          </NavLink>

          <NavLink to="/about" className="shrink-0 text-[11px] font-semibold text-text-default">
            소개
          </NavLink>
          <NavLink to="/projects" className="shrink-0 text-[11px] font-semibold text-text-default">
            프로젝트
          </NavLink>

          {/*Apply*/}
          <NavLink
            to="/apply"
            className="shrink-0 rounded-full border-[1.5px] border-point px-[12px] py-2 text-[11px] font-semibold text-point"
          >
            지원하기
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
