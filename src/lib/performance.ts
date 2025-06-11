// Performance utilities for the application
interface PerformanceConfig {
  enableServiceWorker: boolean;
  enableWebVitals: boolean;
  enablePreload: boolean;
}

const config: PerformanceConfig = {
  enableServiceWorker: false, // Disabled for now to avoid errors
  enableWebVitals: true,
  enablePreload: true,
};

// Service Worker registration utility (currently disabled)
export const registerServiceWorker = () => {
  if (!config.enableServiceWorker) {
    console.log('Service Worker disabled in config');
    return;
  }

  if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        });
        
        console.log('SW registered successfully:', registration);
        
        // Check for updates every hour instead of 24 hours
        const updateInterval = setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000); // 1 hour
        
        // Cleanup interval on page unload
        window.addEventListener('beforeunload', () => {
          clearInterval(updateInterval);
        });
        
      } catch (error) {
        console.log('SW registration failed:', error);
      }
    });
  }
};

// Preload critical resources with error handling
export const preloadCriticalResources = () => {
  if (!config.enablePreload || typeof document === 'undefined') {
    return;
  }

  const criticalResources = [
    { href: '/paintings/9.webp', as: 'image' },
    { href: '/saatchi-art.webp', as: 'image' },
  ];

  criticalResources.forEach(({ href, as }) => {
    try {
      const existingLink = document.querySelector(`link[href="${href}"]`);
      if (existingLink) return; // Avoid duplicates
      
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      
      // Use standard property instead of fetchPriority
      if (as === 'image') {
        link.setAttribute('importance', 'high');
      }
      
      // Error handling for failed preloads
      link.onerror = () => {
        console.warn(`Failed to preload resource: ${href}`);
      };
      
      document.head.appendChild(link);
    } catch (error) {
      console.warn(`Error preloading ${href}:`, error);
    }
  });
};

// Performance monitoring with improved error handling
export const trackWebVitals = () => {
  if (!config.enableWebVitals || typeof window === 'undefined' || !window.performance) {
    return;
  }

  const observers: PerformanceObserver[] = [];

  // Track LCP (Largest Contentful Paint) with cleanup
  const trackLCP = () => {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        
        if (lastEntry) {
          const lcpTime = Math.round(lastEntry.startTime);
          console.log('LCP:', lcpTime + 'ms');
          
          // Send to analytics if available
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'LCP', {
              event_category: 'Web Vitals',
              value: lcpTime,
              custom_parameter_1: lastEntry.element?.tagName || 'unknown'
            });
          }
        }
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      observers.push(lcpObserver);
    } catch (error) {
      console.log('LCP monitoring not supported:', error);
    }
  };

  // Track CLS (Cumulative Layout Shift) with cleanup
  const trackCLS = () => {
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        
        const clsScore = Math.round(clsValue * 1000);
        console.log('CLS:', clsScore / 1000);
        
        // Send to analytics if available
        if (typeof window !== 'undefined' && (window as any).gtag && clsScore > 0) {
          (window as any).gtag('event', 'CLS', {
            event_category: 'Web Vitals',
            value: clsScore
          });
        }
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      observers.push(clsObserver);
    } catch (error) {
      console.log('CLS monitoring not supported:', error);
    }
  };

  // Track FID (First Input Delay) with cleanup
  const trackFID = () => {
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          const fidTime = Math.round(entry.processingStart - entry.startTime);
          console.log('FID:', fidTime + 'ms');
          
          // Send to analytics if available
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'FID', {
              event_category: 'Web Vitals',
              value: fidTime
            });
          }
        }
      });
      
      fidObserver.observe({ entryTypes: ['first-input'] });
      observers.push(fidObserver);
    } catch (error) {
      console.log('FID monitoring not supported:', error);
    }
  };

  // Initialize tracking
  trackLCP();
  trackCLS();
  trackFID();

  // Cleanup observers on page unload
  const cleanup = () => {
    observers.forEach(observer => {
      try {
        observer.disconnect();
      } catch (error) {
        console.warn('Error disconnecting observer:', error);
      }
    });
    observers.length = 0;
  };

  window.addEventListener('beforeunload', cleanup);
  window.addEventListener('pagehide', cleanup);

  // Return cleanup function for manual cleanup if needed
  return cleanup;
};

// Utility to check if performance features are supported
export const isPerformanceSupported = () => {
  return {
    serviceWorker: 'serviceWorker' in navigator,
    performanceObserver: 'PerformanceObserver' in window,
    intersectionObserver: 'IntersectionObserver' in window,
    webVitals: 'PerformanceObserver' in window && typeof window.performance !== 'undefined'
  };
};

// Initialize all performance features
export const initPerformance = () => {
  const support = isPerformanceSupported();
  
  console.log('Performance features support:', support);
  
  if (support.serviceWorker && config.enableServiceWorker) {
    registerServiceWorker();
  }
  
  if (support.webVitals && config.enableWebVitals) {
    // Delay Web Vitals tracking to not interfere with initial load
    setTimeout(() => {
      trackWebVitals();
    }, 1000);
  }
  
  if (config.enablePreload) {
    preloadCriticalResources();
  }
};
