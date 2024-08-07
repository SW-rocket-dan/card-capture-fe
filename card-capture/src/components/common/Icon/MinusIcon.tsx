import { SVGProps } from 'react';

const MinusIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1 1H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default MinusIcon;
