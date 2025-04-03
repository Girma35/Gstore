'use client';

import { Seater, Mask, Cloud } from '../../assets/images/index';

import { Hero, Hero2,Hero3} from '../hero/hero';
import styles from './productHero.module.css';

export const ProductHero = () => {
  return (
    <>
      <Hero
        title="Rocket Single Seater"
        subtitle="Elevate your experience"
        image={<Seater />}
        ctaText="Pre-order Now"
        onCtaClick={() => console.log('CTA clicked')}
      />

      <Hero2
        subtitle="Side table"
        image={<Mask />}
        image2={<Cloud />}
        ctaText="View More"
        onCtaClick={() => console.log('CTA clicked')}
      />

<Hero3 />,
     

    </>
  );
};

