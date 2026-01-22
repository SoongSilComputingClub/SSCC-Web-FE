import { Outlet } from 'react-router-dom';

import { Footer } from './footer';
import { Header } from './header';

export function AppShell() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
