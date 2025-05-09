import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import theme from './theme';
import AppRoutes from './routes/AppRoutes';
import Layout from './components/layout/Layout';
import { MicroTutorialProvider } from './components/tutorial/MicroTutorialContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000 // 5 minutes
    }
  }
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MicroTutorialProvider>
          <BrowserRouter future={{ 
            v7_startTransition: true, 
            v7_relativeSplatPath: true 
          }}>
            <Layout>
              <AppRoutes />
            </Layout>
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  background: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  border: `1px solid ${theme.palette.divider}`
                }
              }}
            />
          </BrowserRouter>
        </MicroTutorialProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;