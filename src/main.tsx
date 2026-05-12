import { createRoot } from 'react-dom/client'
import './index.css'
import { initPerformance } from './lib/performance'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from "@vercel/analytics/react";
import { I18nProvider } from "./lib/i18n";
import GoogleAnalytics from "./components/GoogleAnalytics";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import ArtworkDetail from "./pages/ArtworkDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import PhotoGalleryPage from "./pages/PhotoGallery";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

// Global error handling for non-critical errors
window.addEventListener('error', (event) => {
  const nonCriticalErrors = [
    'Promised response from onMessage listener went out of scope',
    'ResizeObserver loop limit exceeded',
    'Script error',
    'Non-Error promise rejection captured'
  ];
  
  const isNonCritical = nonCriticalErrors.some(msg => 
    event.message?.includes(msg) || event.error?.message?.includes(msg)
  );
  
  if (isNonCritical) {
    // Prevent these errors from appearing in console
    event.preventDefault();
    console.debug('Non-critical error suppressed:', event.message);
    return false;
  }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  const nonCriticalErrors = [
    'onMessage listener went out of scope',
    'ResizeObserver loop',
    'Script error'
  ];
  
  const reason = event.reason?.message || event.reason || '';
  const isNonCritical = nonCriticalErrors.some(msg => 
    reason.toString().includes(msg)
  );
  
  if (isNonCritical) {
    event.preventDefault();
    console.debug('Non-critical promise rejection suppressed:', reason);
    return false;
  }
});

// Initialize performance monitoring after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initPerformance();
});

// Define App inline
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <I18nProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <GoogleAnalytics />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:id" element={<ArtworkDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/gallery" element={<PhotoGalleryPage />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            {import.meta.env.PROD && <Analytics />}
          </TooltipProvider>
        </I18nProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

createRoot(document.getElementById("root")!).render(<App />);
