import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useI18n } from '@/lib/i18n';

// Use environment variables for sensitive configurations
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'default_service';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'default_template';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'default_key';

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [csrfToken, setCsrfToken] = useState<string>('');
  const { t } = useI18n();
  
  // Generate a CSRF token when component loads
  useEffect(() => {
    const generateToken = () => {
      const randomBytes = new Uint8Array(16);
      window.crypto.getRandomValues(randomBytes);
      return Array.from(randomBytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    };
    
    setCsrfToken(generateToken());
  }, []);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Verify that the CSRF token in the form matches the one saved in state
    const formToken = form.current?.querySelector<HTMLInputElement>('input[name="_csrf"]')?.value;
    
    if (formToken !== csrfToken) {
      setStatus('error');
      console.error('CSRF token mismatch');
      return;
    }
    
    setStatus('sending');

    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form.current!,
        EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          setStatus('success');
          if (form.current) {
            form.current.reset();
            // Rigenera il token CSRF dopo un invio riuscito
            setCsrfToken(Array.from(window.crypto.getRandomValues(new Uint8Array(16)))
              .map(b => b.toString(16).padStart(2, '0'))
              .join(''));
          }
        },
        (error) => {
          setStatus('error');
        },
      );
  };
  return (
    <div className="container mx-auto px-4 xs:px-6 py-8 xs:py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl xs:text-4xl md:text-5xl font-serif mb-3">Contact</h1>
        <p className="text-muted-foreground text-base xs:text-lg mb-8 xs:mb-10 max-w-3xl">
          Get in touch with Annibale Pace or the gallery representing his work.
        </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-12">
          <div>
            <h2 className="text-xl xs:text-2xl font-serif mb-4">{t('contact.info.title')}</h2>
            
            <div className="mb-6">
              <h3 className="text-base xs:text-lg font-medium mb-2">{t('contact.info.studio')}</h3>
              <p className="text-muted-foreground text-sm xs:text-base">
                Via Doride 7<br />
                74121 Taranto<br />
                Italy
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-base xs:text-lg font-medium mb-2">{t('contact.info.details')}</h3>
              <p className="text-muted-foreground mb-2 text-sm xs:text-base">
                Email: annibalepaceart@gmail.com
              </p>
              <p className="text-muted-foreground text-sm xs:text-base">
                Phone: +39 339 1319362
              </p>
            </div>
            
            <div>
              <h3 className="text-base xs:text-lg font-medium mb-2">{t('contact.info.representation')}</h3>
              <p className="text-muted-foreground text-sm xs:text-base">
                {t('contact.info.representationText')}
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl xs:text-2xl font-serif mb-4">{t('contact.form.title')}</h2>
              <form ref={form} onSubmit={handleSubmit} className="space-y-4 xs:space-y-6">
              {/* Hidden CSRF token */}
              <input type="hidden" name="_csrf" value={csrfToken} />
              
              <div>
                <label htmlFor="from_name" className="block mb-2 text-sm xs:text-base font-medium">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  required
                  className="w-full p-3 xs:p-4 bg-secondary/50 border border-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded-md text-sm xs:text-base touch-manipulation min-h-[48px]"
                />
              </div>
              
              <div>
                <label htmlFor="from_email" className="block mb-2 text-sm xs:text-base font-medium">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="from_email"
                  name="from_email"
                  required
                  className="w-full p-3 xs:p-4 bg-secondary/50 border border-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded-md text-sm xs:text-base touch-manipulation min-h-[48px]"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm xs:text-base font-medium">
                  {t('contact.form.subject')}
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full p-3 xs:p-4 bg-secondary/50 border border-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded-md text-sm xs:text-base touch-manipulation min-h-[48px]"
                >
                  <option value="">{t('contact.form.selectSubject')}</option>
                  <option value="Artwork Inquiry">{t('contact.form.subjects.artwork')}</option>
                  <option value="Commission Request">{t('contact.form.subjects.commission')}</option>
                  <option value="Exhibition Opportunity">{t('contact.form.subjects.exhibition')}</option>
                  <option value="Press/Media">{t('contact.form.subjects.press')}</option>
                  <option value="Other">{t('contact.form.subjects.other')}</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-sm xs:text-base font-medium">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full p-3 xs:p-4 bg-secondary/50 border border-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded-md text-sm xs:text-base resize-vertical touch-manipulation"
                />
              </div>
              
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3 xs:py-4 bg-foreground text-background font-medium transition-colors hover:bg-foreground/90 disabled:opacity-70 rounded-md text-sm xs:text-base touch-manipulation min-h-[48px]"
              >
                {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
              </button>

              {status === 'success' && (
                <p className="text-green-500 text-center text-sm xs:text-base">{t('contact.form.success')}</p>
              )}
              {status === 'error' && (
                <p className="text-red-500 text-center text-sm xs:text-base">{t('contact.form.error')}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}