import React from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
//import { registerSW } from 'virtual:pwa-register';

import './styles/globals.css';

import { queryClient } from './app/queryClient';
import { router } from './app/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);

//registerSW({ immediate: true });
