'use client';

import { Seater } from '../../assets/images/index';
import { Hero } from '../hero/hero';
import styles from './ProductHero.module.css';

export const ProductHero = () => {
  return (
    <Hero
      title="Rocket Single Seater"
      subtitle="Elevate your experience"
      image={<Seater className={styles.productImage} />}
      ctaText="Pre-order Now"
      onCtaClick={() => console.log('CTA clicked')}
    />
  );
};
