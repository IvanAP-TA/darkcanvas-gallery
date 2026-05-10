import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-sm py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center max-w-full overflow-hidden">
          <Link to="/" className="flex items-center flex-shrink-0 ml-3 md:ml-0">
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
            className="md:hidden touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            style={{
              backgroundColor: isOpen ? '#ff0000' : '#333333',
              color: '#ffffff',
              border: '2px solid #000000',
              borderRadius: '4px'
            }}
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
            </Link>
          </nav>
        </div>
      </header>

      {/* Debug info */}
      <div 
        className="md:hidden fixed top-20 right-4 w-[200px] z-50"
        style={{
          backgroundColor: '#ff0000',
          color: '#ffffff',
          padding: '20px',
          fontSize: '16px',
          fontWeight: 'bold',
          border: '3px solid #000000'
        }}
      >
        TEST DEBUG<br/>
        isOpen: {isOpen ? 'TRUE' : 'FALSE'}
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: '0',
          right: '0', 
          width: '300px',
          height: '100vh',
          backgroundColor: '#ffffff',
          border: '5px solid #ff0000',
          zIndex: '999999',
          padding: '20px',
          color: '#000000',
          fontSize: '18px',
          fontFamily: 'Arial, sans-serif'
        }}>
          <div style={{ marginBottom: '20px', fontSize: '24px', color: '#000000' }}>
            🍔 MENU
          </div>
          
          <div style={{ 
            backgroundColor: '#ffff00', 
            color: '#ff0000', 
            padding: '10px', 
            marginBottom: '20px',
            fontWeight: 'bold'
          }}>
            TEST MENU VISIBLE?
          </div>
          
          <Link to="/" onClick={closeMenu} style={{ display: 'block', marginBottom: '15px', color: '#000000', textDecoration: 'none', fontSize: '18px' }}>
            🏠 Home
          </Link>
          <Link to="/portfolio" onClick={closeMenu} style={{ display: 'block', marginBottom: '15px', color: '#000000', textDecoration: 'none', fontSize: '18px' }}>
            🎨 Portfolio
          </Link>
          <Link to="/gallery" onClick={closeMenu} style={{ display: 'block', marginBottom: '15px', color: '#000000', textDecoration: 'none', fontSize: '18px' }}>
            🖼️ Gallery
          </Link>
          <Link to="/about" onClick={closeMenu} style={{ display: 'block', marginBottom: '15px', color: '#000000', textDecoration: 'none', fontSize: '18px' }}>
            👤 About
          </Link>
          <Link to="/contact" onClick={closeMenu} style={{ display: 'block', marginBottom: '15px', color: '#000000', textDecoration: 'none', fontSize: '18px' }}>
            📧 Contact
          </Link>
          
          <button 
            onClick={closeMenu}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: '#ff0000',
              color: '#ffffff',
              border: 'none',
              padding: '10px',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            ❌ CLOSE
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
