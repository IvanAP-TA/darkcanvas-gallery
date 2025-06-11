import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// Utilizzate variabili d'ambiente per le configurazioni sensibili
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'default_service';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'default_template';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'default_key';

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [csrfToken, setCsrfToken] = useState<string>('');
  
  // Genera un token CSRF al caricamento del componente
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
    
    // Verifica che il token CSRF nel form corrisponda a quello salvato nello stato
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
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif mb-3">Contact</h1>
        <p className="text-muted-foreground text-lg mb-10">
          Get in touch with Annibale Pace or the gallery representing his work.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-serif mb-4">Info</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Studio Location</h3>
              <p className="text-muted-foreground">
                Via Doride 7<br />
                74121 Taranto<br />
                Italy
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Contact Details</h3>
              <p className="text-muted-foreground mb-2">
                Email: annibalepaceart@gmail.com
              </p>
              <p className="text-muted-foreground">
                Phone: +39 339 1319362
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Representation</h3>
              <p className="text-muted-foreground">
                For sales and exhibition inquiries, please contact me at annibalepaceart@gmail.com
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-serif mb-4">Send a Message</h2>
            
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              {/* Token CSRF nascosto */}
              <input type="hidden" name="_csrf" value={csrfToken} />
              
              <div>
                <label htmlFor="from_name" className="block mb-2 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  required
                  className="w-full p-3 bg-secondary/50 border border-muted text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <div>
                <label htmlFor="from_email" className="block mb-2 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="from_email"
                  name="from_email"
                  required
                  className="w-full p-3 bg-secondary/50 border border-muted text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full p-3 bg-secondary/50 border border-muted text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select a subject</option>
                  <option value="Artwork Inquiry">Artwork Inquiry</option>
                  <option value="Commission Request">Commission Request</option>
                  <option value="Exhibition Opportunity">Exhibition Opportunity</option>
                  <option value="Press/Media">Press/Media</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full p-3 bg-secondary/50 border border-muted text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3 bg-foreground text-background font-medium transition-colors hover:bg-foreground/90 disabled:opacity-70"
              >
                {status === 'sending' ? "Sending..." : "Send Message"}
              </button>

              {status === 'success' && (
                <p className="text-green-500 text-center">Message sent successfully!</p>
              )}
              {status === 'error' && (
                <p className="text-red-500 text-center">Error sending message. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}