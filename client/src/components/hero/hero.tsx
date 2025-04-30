'use client';

import { useRouter } from 'next/navigation';
import { cn } from '../../utils/cn';
import React, { ReactNode } from 'react';
import { product } from './productData';
import { Card1, Card2, Card3, Card4 } from '../../assets/images';
import ProductCard from '../common/productCard'; 
import Link from 'next/link';
import { motion } from 'framer-motion';

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

interface Hero3Props {
  title?: string;
  subtitle?: string;
  className?: string;
}

interface Hero4Props extends HeroProps {}

interface Hero5Props extends Hero3Props {}

const CTAButton = ({ 
  text, 
  onClick 
}: { 
  text: string; 
  onClick?: () => void 
}) => {
  const router = useRouter();

  const handleClick = () => {
    onClick?.();
    router.push('/shop');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-400 transition"
      aria-label={text}
    >
      {text}
      <span className="ml-2">→</span>
    </motion.button>
  );
};

export const Hero = ({
  title,
  subtitle,
  ctaText = 'Shop Now',
  onCtaClick,
  image,
  variant = 'default',
  className = '',
}: HeroProps) => {
  return (
    <section 
      className={cn(
        'py-16 px-4 flex items-center justify-between',
        className, 
        variant === 'reverse' ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <motion.div 
        initial={{ opacity: 0, x: variant === 'reverse' ? 50 : -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center lg:text-left max-w-lg"
      >
        {title && <h1 className="text-4xl font-bold mb-4">{title}</h1>}
        {subtitle && <p className="text-xl text-gray-600 mb-6">{subtitle}</p>}
        <CTAButton text={ctaText} onClick={onCtaClick} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-xs mx-auto lg:max-w-md"
      >
        <div>{image}</div>
      </motion.div>
    </section>
  );
};

export const Hero2 = ({
  subtitle,
  ctaText = 'Shop Now',
  onCtaClick,
  image,
  image2,
  className = '',
}: Hero2Props) => {
  return (
    <section className={cn('grid grid-cols-1 md:grid-cols-2 gap-8', className)}>
      {[image, image2].map((img, index) => (
        <motion.div 
          key={`hero2-item-${index}`}
          whileHover={{ y: -5 }}
          className="relative group"
        >
          <div className="overflow-hidden">{img}</div>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
            {subtitle && <p className="text-2xl font-semibold">{subtitle}</p>}
            <CTAButton text={ctaText} onClick={onCtaClick} />
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export const Hero3 = ({
  title = 'Top Picks For You',
  subtitle = 'Find a bright ideal to suit your taste with our great selection',
  className = '',
}: Hero3Props) => {
  return (
    <section className={cn('py-16 px-4', className)}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-xl text-gray-600">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {product.slice(0, 4).map((item) => (
          <motion.div
            key={`product-${item.id}`}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard
              image={
                item.id === 1 ? <Card1 priority /> : 
                item.id === 2 ? <Card2 priority /> : 
                item.id === 3 ? <Card3 priority /> : 
                <Card4 priority />
              }
              type={item.type}
              name={item.name}
              price={item.price}
              color={item.color}
              size={item.size}
            />
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-12">
        <CTAButton 
          text="View More" 
          onClick={() => console.log('View more clicked')} 
        />
      </div>
    </section>
  );
};

export const Hero4 = ({
  title,
  subtitle,
  ctaText = 'Shop Now',
  onCtaClick,
  image,
  variant = 'default',
  className = '',
}: Hero4Props) => {
  return (
    <section 
      className={cn(
        'py-16 px-4 flex items-center justify-between',
        className, 
        variant === 'reverse' ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <div className="max-w-lg text-center lg:text-left">
        <span className="text-lg font-semibold text-blue-500">NEW COLLECTION</span>
        {title && <h2 className="text-3xl font-bold mt-2">{title}</h2>}
        {subtitle && <p className="text-xl text-gray-600 mt-4">{subtitle}</p>}
        <CTAButton text={ctaText} onClick={onCtaClick} />
      </div>
      <div className="max-w-xs mx-auto lg:max-w-md">
        <div>{image}</div>
      </div>
    </section>
  );
};

export const Hero5 = ({
  title = 'Design Inspiration',
  subtitle = 'Find a bright ideal to suit your taste with our great selection',
  className = '',
}: Hero5Props) => {
  return (
    <section className={cn('py-16 px-4 text-center', className)}>
      <div>
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-xl text-gray-600">{subtitle}</p>
      </div>
    </section>
  );
};
