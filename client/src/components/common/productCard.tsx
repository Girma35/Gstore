'use client';

import React, { ReactNode } from 'react';
import styles from './productCard.module.css'; // Import CSS module

interface ProductProps {
  image: ReactNode;
  type: string;
  name: string;
  price: number;
  color: {
    mode1?: string;
    mode2?: string;
    mode3?: string;
    mode4?: string;
    mode5?: string;
  };
  size: string;
}

const ProductCard: React.FC<ProductProps> = ({
  image,
  type,
  name,
  price,
  color,
  size,
}): JSX.Element => {
  return (
    <div className={styles.cardContainer}>
    <div className={styles.card}>
      <div className={styles.cardImage}>
        {image}
      </div>
      <p className={styles.productType}>{type}</p>
      <h2 className={styles.productName}>{name}</h2>
      <p className={styles.productPrice}>Rs.{price}</p>
      <div className={styles.productColor}>
        {color.mode1 && <div className={styles.pColor} style={{ backgroundColor: color.mode1 }} />}
        {color.mode2 && <div className={styles.pColor} style={{ backgroundColor: color.mode2 }} />}
        {color.mode3 && <div className={styles.pColor} style={{ backgroundColor: color.mode3 }} />}
        {color.mode4 && <div className={styles.pColor} style={{ backgroundColor: color.mode4 }} />}
        {color.mode5 && <div className={styles.pColor} style={{ backgroundColor: color.mode5 }} />}
      </div>
      <h3 className={styles.productSize}>{size}</h3>
    </div>
    </div>
  );
};

export default ProductCard;
