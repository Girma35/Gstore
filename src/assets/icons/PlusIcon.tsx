import * as React from "react";
import { SVGProps, Ref, forwardRef, memo } from "react";
const SvgComponent = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={17}
    fill="none"
    ref={ref}
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#6B6B6B"
        d="M13.778 6.7H9.333V2.254a1.333 1.333 0 0 0-2.667 0v4.444H2.222a1.333 1.333 0 1 0 0 2.667h4.444v4.444a1.333 1.333 0 0 0 2.667 0V9.366h4.445a1.333 1.333 0 0 0 0-2.667Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 .032h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
export { Memo as PlusIcon };
