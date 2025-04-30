'use client';

import { Seater, Mask, Cloud, Asgaard } from '../../assets/images/index';
import { Hero, Hero2, Hero3, Hero4, Hero5 } from './hero';
import { Suspense } from 'react';
import Loading from './loading';

export const ProductHero = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Animation */}
      <Suspense fallback={<Loading />}>
        <Hero
          title="Rocket Single Seater"
          subtitle="Premium comfort meets modern design"
          image={<Seater priority />}
          ctaText="Pre-order Now"
          onCtaClick={() => console.log('CTA clicked')}
          className="bg-gradient-to-r from-gray-50 to-gray-100 py-16 px-4 text-center"
        />

        {/* Dual Product Showcase */}
        <Hero2
          subtitle="Side table"
          title=""
          image={<Mask priority />}
          image2={<Cloud priority />}
          ctaText="View Collection"
          onCtaClick={() => console.log('CTA clicked')}
          className="bg-white py-16 px-4 text-center"
        />

        {/* Featured Products */}
        <Hero3 
          title="Top Picks For You" 
          subtitle="Curated selection of our finest products"
          className="bg-gray-50 py-16 px-4 text-center"
        />
        
        {/* New Arrivals */}
        <Hero4
          title="New Arrivals"
          subtitle="Asgaard sofa"
          image={<Asgaard priority />}
          ctaText="Shop Now"
          onCtaClick={() => console.log('CTA clicked')}
          variant="reverse"
          className="bg-gray-100 py-16 px-4 text-center"
        />

        {/* Blog Section */}
        <Hero5 
          title="Design Inspiration"
          subtitle="Latest trends and styling tips"
          className="bg-white py-16 px-4 text-center"
        />
      </Suspense>
    </main>
  );
};
