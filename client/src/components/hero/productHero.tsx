'use client';

import { Seater, Mask, Cloud,Asgaard } from '../../assets/images/index';
import { Hero, Hero2,Hero3,Hero4,Hero5} from './hero';

export const ProductHero = () => {
  return (
    <>
      <Hero
        title="Rocket Single Seater"
        subtitle="Elevate your experience"
        image={<Seater priority />}
        ctaText="Pre-order Now"
        onCtaClick={() => console.log('CTA clicked')}
      />

      <Hero2
        subtitle="Side table"
        image={<Mask priority />}
        image2={<Cloud priority />}
        ctaText="View More"
        onCtaClick={() => console.log('CTA clicked')}
      />

<Hero3 />,
     
<Hero4
        title="New Arrivals"
        subtitle="Asgaard sofa"
        image={<Asgaard priority />}
        ctaText="Pre-order Now"
        onCtaClick={() => console.log('CTA clicked')}
      />
<Hero5 />,
    </>
  );
};

