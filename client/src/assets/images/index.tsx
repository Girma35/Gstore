'use client';

import { cn } from "../../utils/cn";
import Image, { StaticImageData, ImageProps } from "next/image";
import { FC } from "react";

// Import all images
import seater from "./Rocket single seater 1.png";
import mask from "./Mask group.png";
import cloud from "./Cloud sofa three seater.png";
import card1 from "./card1.png";
import card2 from "./card2.png";
import card3 from "./card3.png";
import card4 from "./card4.png";
import asgaard from "./Asgaard sofa 1.png";
import computer1 from "./computer1.png";
import computer2 from "./computer2.png";
import computer3 from "./computer3.png";
import bgImg from "./bgImg.png";
import support from "./Support.jpg";

// Create reusable Image Component
type ImageComponentProps = Omit<ImageProps, "src" | "alt">;

export const createImage = (
  src: StaticImageData,
  alt: string
): FC<ImageComponentProps> => {
  const ImageComponent: FC<ImageComponentProps> = (props) => (
    <Image
      src={src}
      alt={alt}
      width={300}
      height={400}
      {...props}
      className={cn("object-contain", props.className)}
    />
  );

  ImageComponent.displayName = `Image(${alt})`;

  return ImageComponent;
};

// Generate all images
export const Seater = createImage(seater, "Rocket single seater");
export const Cloud = createImage(cloud, "Cloud sofa three seater");
export const Mask = createImage(mask, "Mask group");
export const Card1 = createImage(card1, "Card 1");
export const Card2 = createImage(card2, "Card 2");
export const Card3 = createImage(card3, "Card 3");
export const Card4 = createImage(card4, "Card 4");
export const Asgaard = createImage(asgaard, "Asgaard sofa");
export const Computer1 = createImage(computer1, "Computer 1");
export const Computer2 = createImage(computer2, "Computer 2");
export const Computer3 = createImage(computer3, "Computer 3");
export const BgImg = createImage(bgImg, "Background Image");
export const Support = createImage(support, "Support Image");
