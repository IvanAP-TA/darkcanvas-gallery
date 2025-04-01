import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
    dataLayer: any[];
  }
}

export default function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Inizializza Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=G-QK7JVB1S6L`; // Sostituisci con il tuo ID
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    // Configurazione base
    window.gtag('js', new Date());
    window.gtag('config', 'G-QK7JVB1S6L'); // Sostituisci con il tuo ID

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Traccia i cambiamenti di pagina
    window.gtag('event', 'page_view', {
      page_path: location.pathname,
      page_title: document.title,
    });
  }, [location]);

  return null;
} 