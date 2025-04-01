import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/portfolio" className="text-foreground/80 hover:text-foreground transition-colors">
            Portfolio
          </Link>
          <Link to="/gallery" className="text-foreground/80 hover:text-foreground transition-colors">
            Gallery
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-foreground/80 hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden fixed inset-0 bg-background z-40 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col space-y-8 pt-20 px-8 h-full">
          <Link 
            to="/" 
            className="text-2xl font-light py-2 border-b border-muted/20"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/portfolio" 
            className="text-2xl font-light py-2 border-b border-muted/20"
            onClick={() => setIsOpen(false)}
          >
            Portfolio
          </Link>
          <Link 
            to="/gallery" 
            className="text-2xl font-light py-2 border-b border-muted/20"
            onClick={() => setIsOpen(false)}
          >
            Gallery
          </Link>
          <Link 
            to="/about" 
            className="text-2xl font-light py-2 border-b border-muted/20"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="text-2xl font-light py-2 border-b border-muted/20"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
