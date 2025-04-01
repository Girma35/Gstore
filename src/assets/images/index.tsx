import { cn } from "@/utils/cn";
import Image, { StaticImageData, ImageProps } from "next/image";
import { FC } from "react";
import seater from "./Rocket single seater 1.png";

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