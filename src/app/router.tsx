import { createBrowserRouter } from 'react-router-dom';

import AboutPage from '@/pages/about';
import ApplyPage from '@/pages/apply';
import ApplyFormPage from '@/pages/apply/form';
import HomePage from '@/pages/home';
import ProjectsPage from '@/pages/projects';
import { AppShell } from '@/shared/layout/app-shell';

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/projects', element: <ProjectsPage /> },
      { path: '/apply', element: <ApplyPage /> },
      { path: '/apply/form', element: <ApplyFormPage /> },
    ],
  },
]);
