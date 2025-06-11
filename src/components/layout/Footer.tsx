import { Link } from "react-router-dom";
import { currentYear } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import SocialLinksComponent from "@/components/ui/SocialLinks";

const Footer = () => {
  const { t } = useI18n();
    return (
    <footer className="bg-black py-12 xs:py-16 mt-16">
      <div className="container mx-auto px-4 xs:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xs:gap-12">
          {/* Colonna 1: About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg xs:text-xl font-serif mb-3 xs:mb-4">Annibale Pace</h3>
            <p className="text-muted-foreground leading-relaxed text-sm xs:text-base">
              {t('footer.about')}
            </p>
          </div>
          
          {/* Colonna 2: Navigation */}
          <div>
            <h3 className="text-lg xs:text-xl font-serif mb-3 xs:mb-4">{t('footer.navigation')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm xs:text-base touch-manipulation min-h-[44px] flex items-center">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors text-sm xs:text-base touch-manipulation min-h-[44px] flex items-center">
                  {t('nav.portfolio')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm xs:text-base touch-manipulation min-h-[44px] flex items-center">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm xs:text-base touch-manipulation min-h-[44px] flex items-center">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Colonna 3: Contact & Social */}
          <div>
            <h3 className="text-lg xs:text-xl font-serif mb-3 xs:mb-4">{t('footer.contact')}</h3>
            <div className="space-y-2 mb-4 xs:mb-6">
              <p className="text-muted-foreground flex items-center text-sm xs:text-base">
                <span className="block">annibalepaceart@gmail.com</span>
              </p>
              <p className="text-muted-foreground flex items-center text-sm xs:text-base">
                <span className="block">+39 339 1319362</span>
              </p>
            </div>              <h4 className="text-base xs:text-lg font-serif mb-3">{t('footer.follow')}</h4>
            <SocialLinksComponent 
              variant="footer" 
              className="flex space-x-4 xs:space-x-6"
              iconSize="md"
            />
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-white/10 mt-8 xs:mt-12 pt-6 xs:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-xs xs:text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} Annibale Pace. {t('footer.rights')}          </p>
          <div className="flex flex-wrap justify-center sm:justify-start space-x-4 mt-4 sm:mt-0">
            <Link to="/privacy" className="text-xs xs:text-sm text-muted-foreground hover:text-foreground transition-colors touch-manipulation min-h-[44px] flex items-center">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="text-xs xs:text-sm text-muted-foreground hover:text-foreground transition-colors touch-manipulation min-h-[44px] flex items-center">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
