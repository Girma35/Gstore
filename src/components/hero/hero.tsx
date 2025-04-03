'use client';
import { cn } from "@/utils/cn";
import React, { ReactNode } from 'react';
import styles from './hero.module.css';
import {product} from './productData';
import { Card1, Card2, Card3, Card4 } from "../../assets/images/index";
import ProductCard from "../common/productCard"; 


interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  image: ReactNode;
  variant?: 'default' | 'reverse';
  className?: string;
}

interface Hero2Props extends HeroProps {
  image2: ReactNode;
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
    <section className={cn(
      styles.heroContainer,
      className,
      variant === 'reverse' && styles.containerReverse
    )}>
      <div className={styles.contentSection}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {subtitle && (
          <p className={styles.subtitle}>
            <span className={styles.subtitleLine} aria-hidden="true" />
            {subtitle}
          </p>
        )}
        {ctaText && (
          <button 
            onClick={onCtaClick} 
            className={styles.ctaButton}
            aria-label={ctaText}
          >
            {ctaText}
            <span className={styles.ctaIcon} aria-hidden="true">→</span>
          </button>
        )}
      </div>
      
      <div className={styles.imageSection}>
        <div className={styles.imageWrapper}>
          {image}
          <div className={styles.imageOverlay} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export const Hero2 = ({
  subtitle,
  ctaText = 'Shop Now',
  onCtaClick,
  image,
  image2,
  variant = 'default',
  className = ''
}: Hero2Props) => {
  return (
    <section className={cn(
      styles.heroContainer,
      styles.dualColumn,
      className,
      variant === 'reverse' && styles.containerReverse
    )}>
      {/* Left Column */}
      <div className={styles.column}>
        <div className={styles.imageWrapper}>
          {image}
          <div className={styles.imageOverlay} aria-hidden="true" />
        </div>
        
        <div className={styles.contentBlock}>
          {subtitle && (
            <p className={styles.subtitle}>
              <span className={styles.subtitleLine} aria-hidden="true" />
              {subtitle}
            </p>
          )}
          <button 
            onClick={onCtaClick} 
            className={styles.ctaButton}
            aria-label={ctaText}
          >
            {ctaText}
            <span className={styles.ctaIcon} aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* Right Column */}
      <div className={styles.column}>
        <div className={styles.imageWrapper}>
          {image2}
          <div className={styles.imageOverlay} aria-hidden="true" />
        </div>
        
        <div className={styles.contentBlock}>
          {subtitle && (
            <p className={styles.subtitle}>
              <span className={styles.subtitleLine} aria-hidden="true" />
              {subtitle}
            </p>
          )}
          <button 
            onClick={onCtaClick} 
            className={styles.ctaButton}
            aria-label={ctaText}
          >
            {ctaText}
            <span className={styles.ctaIcon} aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export const Hero3 =() => {

  return (
    <div className={styles.hero3}>
      <div>
        <h1 className={styles.title}>
          Top Picks For You
        </h1>
        <p className={styles.subtitle}>
          Find a bright ideal to suit your taste with our great selection of suspension, floor and table lights.
        </p>
      
        </div>
  

  <div className={styles.card_container} >
        <ProductCard
          image={<Card1 />}
          key={product[0].id}
          type={product[0].type}
          name={product[0].name}
          price={product[0].price}
          color={product[0].color}
          size={product[0].size}
        />
        <ProductCard
          image={<Card2 />}
          key={product[1].id}
          type={product[1].type}
          name={product[1].name}
          price={product[1].price}
          color={product[1].color}
          size={product[1].size}
        />
        <ProductCard
          image={<Card3 />}
          key={product[2].id}
          type={product[2].type}
          name={product[2].name}
          price={product[2].price}
          color={product[2].color}
          size={product[2].size}
        />
        <ProductCard
          image={<Card4 />}
          key={product[3].id}
          type={product[3].type}
          name={product[3].name}
          price={product[3].price}
          color={product[3].color}
          size={product[3].size}
        />
</div>
</div>

  );
} 