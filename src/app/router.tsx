import { createBrowserRouter } from 'react-router-dom';

import AboutPage from '@/pages/about';
import AdminPage from '@/pages/admin';
import ApplyPage from '@/pages/apply';
import ApplyFormPage from '@/pages/apply/form';
import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import CookiePage from '@/pages/login/cookie';
import ProjectsPage from '@/pages/projects';
import ProjectDetailPage from '@/pages/projects/detail';
import { AuthProvider } from '@/shared/auth/auth-provider';
import { RequireAuth } from '@/shared/auth/require-auth';
import { AppShell } from '@/shared/layout/app-shell';

export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    ),
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/projects', element: <ProjectsPage /> },
      { path: '/projects/:id', element: <ProjectDetailPage /> },
      { path: '/apply', element: <ApplyPage /> },
      {
        path: '/apply/form',
        element: (
          <RequireAuth>
            <ApplyFormPage />
          </RequireAuth>
        ),
      },
      { path: '/admin', element: <AdminPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/cookie', element: <CookiePage /> },
    ],
  },
]);
