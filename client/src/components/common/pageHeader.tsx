import React from "react";
import { BgImg } from "../../assets/images";
import styles from "./pageHeader.module.css";

interface HeroSectionProps {
  title: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title }) => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.backgroundWrapper}>
        <BgImg className={styles.backgroundImage} />
      </div>
      <div className={styles.textWrapper}>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </section>
  );
};

export default HeroSection;

