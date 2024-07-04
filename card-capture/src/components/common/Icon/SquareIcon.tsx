import { SVGProps } from 'react';

const SquareIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id="path-1-inside-1_606_470" fill="white">
        <rect width="14" height="14" rx="1" />
      </mask>
      <rect width="14" height="14" rx="1" stroke="currentColor" stroke-width="3" mask="url(#path-1-inside-1_606_470)" />
    </svg>
  );
};

export default SquareIcon;
