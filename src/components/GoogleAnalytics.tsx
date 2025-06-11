import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-QK7JVB1S6L';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export default function GoogleAnalytics() {
  const location = useLocation();
  useEffect(() => {
    // Only load in production environment
    if (import.meta.env.DEV) {
      return;
    }

    // Delay GA loading to not block critical resources
    const timer = setTimeout(() => {
      if (!window.gtag && typeof window !== 'undefined') {
        try {
          const script = document.createElement('script');
          script.async = true;
          script.defer = true;
          script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
          
          script.onload = () => {
            try {
              window.dataLayer = window.dataLayer || [];
              window.gtag = function () {
                window.dataLayer.push(arguments);
              };
              window.gtag('js', new Date());
              window.gtag('config', GA_ID, {
                page_title: document.title,
                page_location: window.location.href,
                send_page_view: false // Prevent automatic page views
              });
            } catch (error) {
              console.warn('Google Analytics initialization error:', error);
            }
          };
          
          script.onerror = () => {
            console.warn('Failed to load Google Analytics');
          };
          
          document.head.appendChild(script);
        } catch (error) {
          console.warn('Google Analytics setup error:', error);
        }
      }
    }, 2000); // Delay by 2 seconds to prioritize critical resources

    return () => {
      clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    // Only track page views if gtag is available and not in development
    if (window.gtag && !import.meta.env.DEV) {
      try {
        window.gtag('event', 'page_view', {
          page_path: location.pathname,
          page_title: document.title,
        });
      } catch (error) {
        console.warn('Google Analytics tracking error:', error);
      }
    }
  }, [location]);

  return null;
}