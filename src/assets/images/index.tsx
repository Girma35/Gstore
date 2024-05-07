/* eslint-disable react/display-name */

import { cn } from "@/utils/cn";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";

// IMPORT IMAGES
// import govGptLogo from "@/assets/images/govgpt-logo/govgpt-logo.svg";

const createImage =
  (
    src: StaticImageData,
    alt: string
  ): FC<Omit<Parameters<typeof Image>[0], "src" | "alt">> =>
  (props) =>
    (
      <Image
        src={src}
        alt={alt}
        {...props}
        className={cn("object-contain", props.className)}
      />
    );

// export const GovGPTLogo = createImage(govGptLogo, "Example"); // use like: <Example />
