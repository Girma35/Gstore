import { cn } from "../../utils/cn";
import Image, { StaticImageData, ImageProps } from "next/image";
import { FC } from "react";
import seater from "./Rocket single seater 1.png";
import mask from "./Mask group.png";
import cloud from "./Cloud sofa three seater.png";
import card1 from "./card1.png";
import card2 from "./card2.png";
import card3 from "./card3.png";
import card4 from "./card4.png";

type ImageComponentProps = Omit<ImageProps, "src" | "alt">;

export const createImage = (
  src: StaticImageData,
  alt: string
): FC<ImageComponentProps> => {
  const ImageComponent: FC<ImageComponentProps> = (props) => (
    <Image
      src={src}
      alt={alt}
      {...props}
      className={cn("object-contain", props.className)}
    />
  );
  
  // For better debugging in React DevTools
  ImageComponent.displayName = `Image(${alt})`;
  
  return ImageComponent;
};

export const Seater = createImage(seater, "Rocket single seater");
export const  Cloud = createImage(cloud, "Rocket single seater");
export const Mask = createImage(mask, "Rocket single seater");
export const Card1= createImage(card1, "card img ");
export const Card2= createImage(card2, "card img ");
export const Card3= createImage(card3, "card img ");
export const Card4= createImage(card4, "card img ");
