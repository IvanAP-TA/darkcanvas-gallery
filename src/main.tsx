import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initPerformance } from './lib/performance'

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

createRoot(document.getElementById("root")!).render(<App />);
