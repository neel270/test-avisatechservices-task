import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { hydrateFromStorage } from './store/authSlice';
import { ToastProvider } from './contexts/ToastContext';

const queryClient = new QueryClient();

// Preload auth state from localStorage
store.dispatch(hydrateFromStorage());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </ToastProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
