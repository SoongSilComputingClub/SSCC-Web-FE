import { Outlet } from 'react-router-dom';

import { Footer } from './footer';
import { Header } from './header';
import { ScrollToTop } from './scrolltotop';
export function AppShell() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
