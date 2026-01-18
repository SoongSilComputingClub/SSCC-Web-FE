import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
//import { registerSW } from 'virtual:pwa-register';

import './styles/globals.css';

import { router } from './app/router';
import { queryClient } from './app/queryClient';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-bg-default">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  </React.StrictMode>,
);

//registerSW({ immediate: true });
