import React from 'react';

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color?: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/annibale.pace',
    icon: '/facebook-svgrepo-com.svg',
    color: 'hover:text-blue-600'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/annibalepaceart/',
    icon: '/instagram-svgrepo-com.svg',
    color: 'hover:text-pink-600'
  },
  {
    name: 'Etsy',
    url: 'https://www.etsy.com/shop/AnnibaleArtworks?ref=dashboard-header',
    icon: '/etsy-svgrepo-com.svg',
    color: 'hover:text-orange-600'
  }
];

interface SocialLinksProps {
  variant?: 'footer' | 'hero' | 'mobile' | 'floating' | 'navbar';
  className?: string;
  iconSize?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  onLinkClick?: () => void;
}

const SocialLinksComponent: React.FC<SocialLinksProps> = ({
  variant = 'footer',
  className = '',
  iconSize = 'md',
  showLabels = false,
  onLinkClick
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const iconClass = sizeClasses[iconSize];

  const getVariantClasses = () => {
    switch (variant) {
      case 'hero':
        return 'inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-all hover:scale-105 text-sm sm:text-base font-medium touch-manipulation min-h-[44px]';
      case 'mobile':
        return 'flex items-center gap-3 p-3 rounded-lg border border-muted/20 text-muted-foreground hover:text-foreground hover:border-muted/40 transition-all touch-manipulation min-h-[48px]';
      case 'navbar':
        return 'text-foreground/60 hover:text-foreground transition-all hover:scale-110 touch-manipulation min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full hover:bg-muted/10';
      case 'floating':
        return 'block p-3 text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-foreground touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-muted/10';
      case 'footer':
      default:
        return 'text-muted-foreground hover:text-foreground transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center';
    }
  };

  const linkClasses = getVariantClasses();

  return (
    <div className={className}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkClasses} ${social.color || ''}`}
          aria-label={`Follow on ${social.name}`}
          title={`Follow on ${social.name}`}
          onClick={onLinkClick}
        >
          <img 
            src={social.icon} 
            alt={`${social.name} icon`} 
            className={`${iconClass} ${variant === 'navbar' || variant === 'floating' ? 'opacity-70 hover:opacity-100 transition-opacity' : 'opacity-80'}`}
          />
          {showLabels && (
            <span className={variant === 'mobile' ? 'text-sm font-medium' : ''}>
              {social.name === 'Etsy' ? 'Shop' : social.name}
            </span>
          )}
        </a>
      ))}
    </div>
  );
};

export default SocialLinksComponent;
