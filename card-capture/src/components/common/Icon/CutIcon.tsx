import { SVGProps } from 'react';

const CutIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M2.79999 0V11.2H14" stroke="currentColor" strokeWidth="1.12" />
      <path d="M11.2 14L11.2 2.8L1.27299e-05 2.8" stroke="currentColor" strokeWidth="1.12" />
      <line x1="2.87068" y1="10.9906" x2="13.1373" y2="0.723974" stroke="currentColor" strokeWidth="1.12" />
    </svg>
  );
};

export default CutIcon;
