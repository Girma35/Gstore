import React from 'react';
import { BgImg } from '../../assets/images/index';

interface HeroSectionProps {
  title: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title }) => {
  return (
    <div className="relative w-full max-w-[1440px] h-[316px] overflow-hidden">
      {/* Background image with exact dimensions */}
      <div className="absolute inset-0 w-full h-full">
        <BgImg 
          className="w-full h-full object-cover object-center"
          style={{ 
            width: '1440px',
            height: '316px',
            minWidth: '100%',
            minHeight: '100%'
          }}
        />
      </div>
      
      {/* Centered title with precise positioning */}
      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     text-4xl font-bold text-black drop-shadow-lg z-10 
                     w-full text-center px-4">
        {title}
      </h1>
    </div>
  );
};

export default HeroSection;