import { Link } from "react-router-dom";
import { currentYear } from "@/lib/utils";

const Footer = () => {
  return (
    <footer className="bg-black py-16 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Colonna 1: About */}
          <div>
            <h3 className="text-xl font-serif mb-4">Annibale Pace</h3>
            <p className="text-muted-foreground leading-relaxed">
              Contemporary artist exploring the boundaries between form, color, and emotion through various media and techniques.
            </p>
          </div>
          
          {/* Colonna 2: Navigation */}
          <div>
            <h3 className="text-xl font-serif mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Colonna 3: Contact & Social */}
          <div>
            <h3 className="text-xl font-serif mb-4">Contact</h3>
            <div className="space-y-2 mb-6">
              <p className="text-muted-foreground flex items-center">
                <span className="block">annibalepaceart@gmail.com</span>
              </p>
              <p className="text-muted-foreground flex items-center">
                <span className="block">+39 339 1319362</span>
              </p>
            </div>
            
            <h4 className="text-lg font-serif mb-3">Follow Me</h4>
            <div className="flex space-x-6">
              <a 
                href="https://www.facebook.com/annibale.pace" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/facebook-svgrepo-com.svg" alt="" className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/annibalepaceart/" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/instagram-svgrepo-com.svg" alt="" className="w-5 h-5" />
              </a>
              <a 
                href="https://www.etsy.com/shop/AnnibaleArtworks?ref=dashboard-header" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Etsy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/etsy-svgrepo-com.svg" alt="" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Annibale Pace. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
