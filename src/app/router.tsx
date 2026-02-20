import { createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

import AboutPage from '@/pages/about';
import ActivitiesPage from '@/pages/activities';
import ActivityDetailPage from '@/pages/activities/detail';
import AdminPage from '@/pages/admin';
import ApplyPage from '@/pages/apply';
import ApplyFormPage from '@/pages/apply/form';
import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import CookiePage from '@/pages/login/cookie';
import { AuthProvider } from '@/shared/auth/auth-provider';
import RequireAdmin from '@/shared/auth/require-admin';
import { RequireAuth } from '@/shared/auth/require-auth';
import { AppShell } from '@/shared/layout/app-shell';

export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <>
          <Toaster
            position="top-center"
            richColors
            offset="70px"
            style={{ top: '70px' }}
            toastOptions={{
              className:
                'text-lg px-8 py-6 rounded-2xl shadow-xl bg-neutral-900 text-white border border-neutral-800',
            }}
          />
          <AppShell />
        </>
      </AuthProvider>
    ),
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/activities', element: <ActivitiesPage /> },
      { path: '/activities/:id', element: <ActivityDetailPage /> },
      { path: '/apply', element: <ApplyPage /> },
      {
        path: '/apply/form',
        element: (
          <RequireAuth>
            <ApplyFormPage />
          </RequireAuth>
        ),
      },
      {
        path: '/admin',
        element: (
          <RequireAdmin>
            <AdminPage />
          </RequireAdmin>
        ),
      },
      { path: '/login', element: <LoginPage /> },
      { path: '/cookie', element: <CookiePage /> },
    ],
  },
]);
