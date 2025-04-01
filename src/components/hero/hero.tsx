'use client';
import React, { ReactNode } from 'react';
import styles from './hero.module.css';

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  image: ReactNode;
  variant?: 'default' | 'reverse';
  className?: string;
}

export const Hero = ({
  title,
  subtitle,
  ctaText = 'Shop Now',
  onCtaClick,
  image,
  variant = 'default',
  className = ''
}: HeroProps) => {
  return (
    <section className={`${styles.heroMain} ${className} ${variant === 'reverse' ? styles.reverse : ''}`}>
      <div className={styles.sectionLeft}>
        <h1 className={styles.heroTitle}>{title}</h1>
        {subtitle && <p className={styles.heroSubtitle}>{subtitle}</p>}
        {ctaText && (
          <button onClick={onCtaClick} className={styles.heroCta}>
            {ctaText}
          </button>
        )}
      </div>
      <div className={styles.sectionRight}>
        <div className={styles.heroImageWrapper}>
          {image}
        </div>
      </div>
    </section>
  );
};