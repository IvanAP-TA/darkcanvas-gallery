import React from 'react';
import SocialLinksComponent from '@/components/ui/SocialLinks';

const SocialFloatingBar = () => {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center space-y-4">
      <div className="bg-background/90 backdrop-blur-sm border border-muted/20 rounded-full p-2 shadow-lg">
        <SocialLinksComponent 
          variant="floating" 
          className="flex flex-col space-y-1"
          iconSize="md"
        />
      </div>
      
      {/* Properly centered rotated label */}
      <div className="flex items-center justify-center h-16 w-6">
        <span className="text-xs text-muted-foreground font-medium tracking-wider transform -rotate-90 whitespace-nowrap">
          FOLLOW
        </span>
      </div>
    </div>
  );
};

export default SocialFloatingBar;
