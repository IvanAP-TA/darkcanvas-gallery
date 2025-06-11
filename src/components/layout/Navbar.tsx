import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import SocialLinksComponent from "@/components/ui/SocialLinks";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language, setLanguage } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.svg" 
            alt="Annibale Pace Logo" 
            className={`h-16 w-auto transition-opacity duration-300 ${
              scrolled ? "opacity-100" : "opacity-90"
            }`}
          />
        </Link>
          {/* Mobile menu button */}
        <button 
          className="md:hidden text-foreground touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
          {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            {t('nav.home')}
          </Link>
          <Link to="/portfolio" className="text-foreground/80 hover:text-foreground transition-colors">
            {t('nav.portfolio')}
          </Link>
          <Link to="/gallery" className="text-foreground/80 hover:text-foreground transition-colors">
            {t('nav.gallery')}
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
            {t('nav.about')}
          </Link>
          <Link to="/contact" className="text-foreground/80 hover:text-foreground transition-colors">
            {t('nav.contact')}
          </Link>            {/* Language Switcher */}
          <div className="flex space-x-2 ml-4">
            <button
              onClick={() => setLanguage('en')}
              className={`text-lg hover:scale-110 transition-transform touch-manipulation min-h-[40px] min-w-[40px] flex items-center justify-center ${language === 'en' ? 'opacity-100' : 'opacity-60'}`}
              title="English"
            >
              🇺🇸
            </button>
            <button
              onClick={() => setLanguage('it')}
              className={`text-lg hover:scale-110 transition-transform touch-manipulation min-h-[40px] min-w-[40px] flex items-center justify-center ${language === 'it' ? 'opacity-100' : 'opacity-60'}`}
              title="Italiano"
            >
              🇮🇹
            </button>
            <button
              onClick={() => setLanguage('zh')}
              className={`text-lg hover:scale-110 transition-transform touch-manipulation min-h-[40px] min-w-[40px] flex items-center justify-center ${language === 'zh' ? 'opacity-100' : 'opacity-60'}`}
              title="中文"
            >
              🇨🇳
            </button>          </div>
        </nav></div>

      {/* Mobile menu overlay - only visible on mobile when menu is open */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu - slides from right */}
      <div 
        className={`md:hidden fixed inset-y-0 right-0 w-full max-w-sm bg-background z-40 transition-transform duration-300 ease-in-out transform shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile menu header with close button */}
        <div className="flex justify-between items-center p-6 border-b border-muted/20">
          <span className="text-lg font-medium text-foreground/80">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-foreground touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center rounded-lg hover:bg-muted/10 transition-colors"
            aria-label="Chiudi menu"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex flex-col space-y-6 pt-6 px-6 h-full safe-area-inset">
          <Link 
            to="/" 
            className="text-xl xs:text-2xl font-light py-3 border-b border-muted/20 touch-manipulation min-h-[48px] flex items-center"
            onClick={() => setIsOpen(false)}
          >
            {t('nav.home')}
          </Link>
          <Link 
            to="/portfolio" 
            className="text-xl xs:text-2xl font-light py-3 border-b border-muted/20 touch-manipulation min-h-[48px] flex items-center"
            onClick={() => setIsOpen(false)}
          >
            {t('nav.portfolio')}
          </Link>
          <Link 
            to="/gallery" 
            className="text-xl xs:text-2xl font-light py-3 border-b border-muted/20 touch-manipulation min-h-[48px] flex items-center"
            onClick={() => setIsOpen(false)}
          >
            {t('nav.gallery')}
          </Link>
          <Link 
            to="/about" 
            className="text-xl xs:text-2xl font-light py-3 border-b border-muted/20 touch-manipulation min-h-[48px] flex items-center"
            onClick={() => setIsOpen(false)}
          >
            {t('nav.about')}
          </Link>
          <Link 
            to="/contact" 
            className="text-xl xs:text-2xl font-light py-3 border-b border-muted/20 touch-manipulation min-h-[48px] flex items-center"
            onClick={() => setIsOpen(false)}
          >
            {t('nav.contact')}
          </Link>
            {/* Mobile Language Switcher */}
          <div className="flex space-x-6 pt-6 border-t border-muted/20">
            <button
              onClick={() => {setLanguage('en'); setIsOpen(false);}}
              className={`text-2xl hover:scale-110 transition-transform touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center ${language === 'en' ? 'opacity-100' : 'opacity-60'}`}
              title="English"
            >
              🇺🇸
            </button>
            <button
              onClick={() => {setLanguage('it'); setIsOpen(false);}}
              className={`text-2xl hover:scale-110 transition-transform touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center ${language === 'it' ? 'opacity-100' : 'opacity-60'}`}
              title="Italiano"
            >
              🇮🇹
            </button>
            <button
              onClick={() => {setLanguage('zh'); setIsOpen(false);}}
              className={`text-2xl hover:scale-110 transition-transform touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center ${language === 'zh' ? 'opacity-100' : 'opacity-60'}`}
              title="中文"
            >
              🇨🇳
            </button>
          </div>          {/* Mobile Social Links */}
          <div className="pt-6 border-t border-muted/20">
            <h4 className="text-sm font-medium text-foreground/80 mb-4 tracking-wider">FOLLOW US</h4>
            <SocialLinksComponent 
              variant="mobile" 
              className="grid grid-cols-2 gap-3"
              iconSize="md"
              showLabels={true}
              onLinkClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
