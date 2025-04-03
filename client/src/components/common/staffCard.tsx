'use client';

import React, { ReactNode } from 'react';
import styles from './staffCard.module.css';

interface StaffProps {
  key: number;
  image: ReactNode;
  buttonText: string;
  name: string;
}

const StaffCard: React.FC<StaffProps> = ({
  key,
  image,
  buttonText,
  name,
}): JSX.Element => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.cardImage}>
          {image}
        </div>
      
        <p className={styles.subtitle}>
        <h2 className={styles.staffName}>{name}</h2>
      
          {buttonText}
            <span className={styles.ctaIcon} aria-hidden="true">→</span>
            </p>
      </div>
    </div>
  );
};

export default StaffCard;