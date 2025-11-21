import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App';

// Create a root
const container = document.getElementById('root');
const root = createRoot(container);

// Render the app
root.render(
  <StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#059669',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#fff',
              secondary: '#059669',
            },
          },
          error: {
            style: {
              background: '#dc2626',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#dc2626',
            },
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>
);
