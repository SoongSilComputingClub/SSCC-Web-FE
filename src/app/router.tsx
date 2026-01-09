import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '@/shared/layout/app-shell';

import HomePage from '@/pages/home';
import AboutPage from '@/pages/about';
import ProjectsPage from '@/pages/projects';
import ApplyPage from '@/pages/apply';
import ApplyFormPage from '@/pages/apply/form';

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
