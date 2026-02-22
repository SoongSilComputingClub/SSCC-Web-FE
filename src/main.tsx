import { StrictMode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './styles/globals.css';

import { queryClient } from './app/queryClient';
import { router } from './app/router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-bg-default">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  </StrictMode>,
);
