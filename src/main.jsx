import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'animate.css';
import { NextUIProvider } from '@nextui-org/react'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter >
  <QueryClientProvider client={queryClient}>
  <NextUIProvider>
    <App />
  </NextUIProvider>
  </QueryClientProvider>
  </BrowserRouter>
  </StrictMode>,
)
